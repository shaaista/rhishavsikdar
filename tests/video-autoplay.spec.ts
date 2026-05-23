import { test, expect } from '@playwright/test';

test.describe('Hero Section Video Autoplay and Compatibility Tests', () => {

  test('Verify hero video autoplays and renders the correct compositing path on Desktop', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'load', timeout: 30000 });

    const video = page.locator('main video').first();
    await expect(video).toBeAttached({ timeout: 15000 });

    // Poll until currentTime advances — fixed waitForTimeout was flaky
    // when the WebM/matte MP4 metadata took longer than expected to load.
    await expect.poll(
      async () => await video.evaluate((el: HTMLVideoElement) => el.currentTime),
      { timeout: 15000, intervals: [250, 500, 1000] }
    ).toBeGreaterThan(0);

    const probe = await video.evaluate((el: HTMLVideoElement) => ({
      paused: el.paused,
      currentTime: el.currentTime,
      muted: el.muted,
      mutedAttr: el.hasAttribute('muted'),
      autoplayAttr: el.hasAttribute('autoplay'),
      childSourceCount: el.querySelectorAll('source').length,
    }));
    console.log(`[${testInfo.project.name}]`, probe);

    expect(probe.autoplayAttr).toBe(true);
    expect(probe.muted).toBe(true);
    expect(probe.currentTime).toBeGreaterThan(0);

    const isWebKit = testInfo.project.name === 'webkit';
    if (isWebKit) {
      // Safari/iOS path renders via <canvas> chroma-key — the <video> is the
      // off-screen frame source with a direct src attribute (no <source>
      // negotiation, which delays iOS autoplay). The muted HTML attribute
      // must be present for iOS Safari's muted-autoplay policy to apply.
      expect(probe.mutedAttr).toBe(true);
      expect(probe.childSourceCount).toBe(0);
      const canvas = page.locator('main canvas[aria-hidden="true"]').first();
      await expect(canvas).toBeAttached();
      const canvasSize = await canvas.evaluate((el: HTMLCanvasElement) => ({
        w: el.width,
        h: el.height,
      }));
      expect(canvasSize.w).toBeGreaterThan(0);
      expect(canvasSize.h).toBeGreaterThan(0);
    } else {
      // Chrome/Firefox/Edge path uses the native <video> with WebM-then-MP4
      // <source> children so VP9 alpha renders natively.
      expect(probe.childSourceCount).toBe(2);
    }
  });
});
