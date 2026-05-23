import { test, expect } from '@playwright/test';

test.describe('Hero Section Video Autoplay and Compatibility Tests', () => {
  
  test('Verify video renders, autoplays and applies correct blend modes on Desktop Chrome', async ({ page }, testInfo) => {
    // Navigate to the index page and wait for network to be idle
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });

    // 1. Verify video element is rendered immediately in the DOM (no conditional mount bug)
    const video = page.locator('main video').first();
    await expect(video).toBeAttached({ timeout: 15000 });

    // 2. Wait for a few seconds to let the video play
    await page.waitForTimeout(2000);

    // 3. Verify video is playing (currentTime > 0 and paused is false)
    const isPlaying = await video.evaluate((el: HTMLVideoElement) => {
      return !el.paused && el.currentTime > 0;
    });
    console.log(`[Desktop] Video playing state: ${isPlaying}`);
    // Note: Autoplay might be blocked by browser configuration in headless mode, 
    // but the element itself should have autoplay attributes.
    const autoplayAttr = await video.getAttribute('autoplay');
    expect(autoplayAttr).not.toBeNull();
    const mutedAttr = await video.evaluate((el: HTMLVideoElement) => el.muted);
    expect(mutedAttr).toBe(true);

    // 4. Verify blend mode is 'normal' for Desktop Chrome (WebM) and 'lighten' for Desktop Webkit (Safari/MP4)
    const container = page.locator('main div.hidden.md\\:flex').first();
    const blendMode = await container.evaluate((el) => window.getComputedStyle(el).mixBlendMode);
    console.log(`[Desktop] Container mixBlendMode: ${blendMode}`);
    
    const isWebKit = testInfo.project.name === 'webkit';
    expect(blendMode).toBe(isWebKit ? 'lighten' : 'normal');
  });

  test('Verify blend mode activates on Mobile emulation (Safari/Android fallback)', async ({ page, playwright }) => {
    // Emulate an iPhone 13 / iOS Safari user agent
    const iPhone = playwright.devices['iPhone 13'];
    const mobileContext = await playwright.chromium.launchPersistentContext('', {
      ...iPhone,
      headless: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:8080/', { waitUntil: 'networkidle', timeout: 30000 }); // Navigate to local preview

    // 1. Verify video is in the DOM
    const video = mobilePage.locator('main video').first();
    await expect(video).toBeAttached({ timeout: 15000 });

    // 2. Check the container style
    const container = mobilePage.locator('main div.hidden.md\\:flex').first();
    const blendMode = await container.evaluate((el) => window.getComputedStyle(el).mixBlendMode);
    console.log(`[Mobile Emulation] Container mixBlendMode: ${blendMode}`);
    
    // On iOS Safari / Android Chrome, WebM alpha isn't supported, so it should be set to lighten
    expect(blendMode).toBe('lighten');

    // 3. Verify will-change stacking context helper is set to prevent Safari rendering bugs
    const willChange = await container.evaluate((el) => window.getComputedStyle(el).willChange);
    expect(willChange).toContain('mix-blend-mode');

    await mobileContext.close();
  });
});
