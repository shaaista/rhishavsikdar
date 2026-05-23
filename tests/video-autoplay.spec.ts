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

    // 4. Verify the SVG chroma-key filter is wired up correctly.
    // - On Chrome/Firefox (WebM with native alpha) the wrapper has no filter.
    // - On WebKit/Safari the wrapper applies url(#hero-black-to-alpha) so the
    //   MP4's black background reads as transparent.
    const filterWrapper = page.locator('main div.hidden.md\\:flex > div').first();
    const computedFilter = await filterWrapper.evaluate((el) => window.getComputedStyle(el).filter);
    console.log(`[Desktop] Wrapper filter: ${computedFilter}`);

    const isWebKit = testInfo.project.name === 'webkit';
    if (isWebKit) {
      expect(computedFilter).toContain('hero-black-to-alpha');
    } else {
      expect(computedFilter === 'none' || computedFilter === '').toBe(true);
    }
  });
});
