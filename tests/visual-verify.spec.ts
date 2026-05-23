import { test, webkit, devices } from '@playwright/test';
import path from 'path';

test.setTimeout(60000);

const captures: Array<{ name: string; device: typeof devices[keyof typeof devices] }> = [
  { name: 'mac-safari', device: devices['Desktop Safari'] },
  { name: 'iphone-13', device: devices['iPhone 13'] },
  { name: 'ipad-pro-11', device: devices['iPad Pro 11'] },
];

for (const { name, device } of captures) {
  test(`screenshot Index on ${name}`, async () => {
    const browser = await webkit.launch();
    const context = await browser.newContext({ ...device });
    const page = await context.newPage();
    try {
      await page.goto('http://localhost:8080/', { waitUntil: 'load', timeout: 30000 });
      // Wait long enough for autoplay to kick in and the image-overlay to fade.
      await page.waitForTimeout(4500);
      const outPath = path.join(process.cwd(), `test-results/visual-${name}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`[${name}] saved -> ${outPath}`);
    } finally {
      await context.close();
      await browser.close();
    }
  });
}
