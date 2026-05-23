import { test, expect, webkit, devices, type Page } from '@playwright/test';

// Exercises the Index hero <video> autoplay fix on the platforms the user
// reported as broken: Mac Safari, iPhone, iPad. Each device gets its own
// WebKit browser context (test.use(devices.X) can't be used inside a
// describe block — it forces a new worker, which Playwright forbids).

const BASE_URL = 'http://localhost:8080/';

async function checkAutoplay(page: Page, label: string) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 30000 });

  const video = page.locator('main video').first();
  await expect(video).toBeAttached({ timeout: 15000 });

  // Poll for currentTime > 0 — the only honest signal that the video
  // actually started playing. paused=false alone fires while metadata is
  // still loading. The hero video is 3s; we cap the wait at 12s.
  await expect.poll(
    async () =>
      await video.evaluate((el: HTMLVideoElement) => el.currentTime),
    { timeout: 12000, intervals: [250, 500, 1000] }
  ).toBeGreaterThan(0);

  const snap = await video.evaluate((el: HTMLVideoElement) => ({
    currentTime: el.currentTime,
    readyState: el.readyState,
    muted: el.muted,
    mutedAttr: el.hasAttribute('muted'),
    currentSrc: el.currentSrc,
    childSourceCount: el.querySelectorAll('source').length,
    error: el.error?.code ?? null,
  }));

  console.log(`[${label}]`, JSON.stringify(snap));
  expect(snap.currentTime, `[${label}] currentTime must advance past 0`).toBeGreaterThan(0);
  expect(snap.muted, `[${label}] muted property must be true`).toBe(true);
  expect(snap.mutedAttr, `[${label}] muted HTML attribute must be present`).toBe(true);
  expect(snap.currentSrc, `[${label}] should resolve to the MP4 file on Safari/iOS`).toMatch(/\.mp4(\?|$)/);
  expect(snap.childSourceCount, `[${label}] Safari path must render single src, no <source> children`).toBe(0);
}

test.describe.configure({ mode: 'serial' });

test('Mac Safari (desktop WebKit) autoplays the Index hero', async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({ ...devices['Desktop Safari'] });
  const page = await context.newPage();
  try {
    await checkAutoplay(page, 'Mac Safari');
  } finally {
    await context.close();
    await browser.close();
  }
});

test('iPhone 13 (mobile WebKit) autoplays the Index hero', async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  try {
    await checkAutoplay(page, 'iPhone 13');
  } finally {
    await context.close();
    await browser.close();
  }
});

test('iPad Pro 11 (tablet WebKit) autoplays the Index hero', async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({ ...devices['iPad Pro 11'] });
  const page = await context.newPage();
  try {
    await checkAutoplay(page, 'iPad Pro 11');
  } finally {
    await context.close();
    await browser.close();
  }
});
