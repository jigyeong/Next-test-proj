import { test, expect, chromium } from '@playwright/test';
import path from "node:path";

test.describe('WebRTC 테스트', () => {

  test.beforeEach(async ({ context }) => {
    // Runs before each test and signs in each page.
    await context.grantPermissions(['camera'], { origin: 'https://webrtc.github.io/samples/src/content/devices/input-output/' });
  });

  test.skip('WebRTC 테스트', async ({ page }) => {

    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext({
      permissions: ['camera'],
      // recordVideo: {
      //   dir: path.join(__dirname, 'videos'),
      //   size: { width: 1280, height: 720 }
      // }
    });

    page = await context.newPage();

    await page.goto('https://webrtc.github.io/samples/src/content/devices/input-output/');
    await page.locator('#video').waitFor();

    const video = document.querySelector('video');
    if(video == null) return;

    const videoSource = await page.evaluate(() => {

      const source = video.querySelector('source');
      if (source) {
        return source.src;
      } else if (video.srcObject) {
        return 'Stream Source';
      } else {
        return video.src;
      }
    });

    console.log('Video Source:', videoSource);

    expect(videoSource).not.toBeNull();

    await page.screenshot({fullPage: true, path: path.join(__dirname, 'webrtc.png')});

    expect(video).toBeTruthy();

    await context.close();
  });
});