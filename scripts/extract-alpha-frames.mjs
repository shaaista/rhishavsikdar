/**
 * extract-alpha-frames.mjs
 *
 * FFmpeg's Windows VP9 decoder ignores the alpha BlockAdditions track and
 * always outputs yuv420p (alpha=255 everywhere). This script uses Playwright's
 * Chromium — which correctly decodes VP9 alpha — to:
 *   1. Seek the source WebM frame by frame
 *   2. Draw each frame to a canvas and extract RGBA data
 *   3. Write two PNG sequences: color frames and alpha-matte frames
 *   4. Use FFmpeg to vstack them into the hero-matte.mp4
 *
 * Usage:  node scripts/extract-alpha-frames.mjs
 * Prereq: npm i -D playwright  (already installed as dev dep)
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { execSync } from 'child_process';
import http from 'http';

const ROOT      = resolve('.');
const WEBM_PATH = join(ROOT, 'src/assets/test-alpha.webm');
const FRAMES_DIR = join(ROOT, 'temp-alpha-frames');
const OUTPUT    = join(ROOT, 'src/assets/hero-matte.mp4');
const FPS       = 30;

// --- tiny HTTP server so Chromium can load the video without CORS issues ---
function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Range');
      res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');

      if (req.url === '/video.webm') {
        const buf = readFileSync(WEBM_PATH);

        // Support HTTP Range requests — Chrome always issues them for video
        const rangeHeader = req.headers['range'];
        if (rangeHeader) {
          const [, start, end] = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
          const s = parseInt(start, 10);
          const e = end ? parseInt(end, 10) : buf.length - 1;
          const chunk = buf.slice(s, e + 1);
          res.writeHead(206, {
            'Content-Type': 'video/webm',
            'Content-Range': `bytes ${s}-${e}/${buf.length}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunk.length,
          });
          res.end(chunk);
        } else {
          res.writeHead(200, {
            'Content-Type': 'video/webm',
            'Accept-Ranges': 'bytes',
            'Content-Length': buf.length,
          });
          res.end(buf);
        }
      } else {
        // HTML host page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html><html><head>
          <style>*{margin:0;padding:0}body{background:#000000}</style>
        </head><body>
          <video id="v" preload="auto" muted playsinline crossorigin="anonymous"
                 src="/video.webm" style="position:absolute;left:-9999px;width:1px;height:1px"></video>
          <canvas id="c" style="position:absolute;left:-9999px"></canvas>
          <div id="status">loading</div>
        </body></html>`);
      }
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

// ---- main ----------------------------------------------------------------
const { server, port } = await startServer();
const BASE = `http://127.0.0.1:${port}`;
console.log(`HTTP server on ${BASE}`);

// Clean frame directory
if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true });
mkdirSync(FRAMES_DIR);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(BASE, { waitUntil: 'networkidle' });

// Wait for video metadata
const { duration, width, height } = await page.evaluate(() =>
  new Promise(resolve => {
    const v = document.getElementById('v');
    if (v.readyState >= 1) {
      resolve({ duration: v.duration, width: v.videoWidth, height: v.videoHeight });
    } else {
      v.addEventListener('loadedmetadata', () =>
        resolve({ duration: v.duration, width: v.videoWidth, height: v.videoHeight }),
        { once: true }
      );
    }
  })
);

console.log(`Video: ${width}×${height}, duration: ${duration.toFixed(3)}s`);

// Set up canvas (color half + matte half stacked vertically)
await page.evaluate(({ w, h }) => {
  const c = document.getElementById('c');
  c.width  = w;
  c.height = h * 2;
}, { w: width, h: height });

const totalFrames = Math.ceil(duration * FPS);
console.log(`Extracting ${totalFrames} frames at ${FPS}fps…`);

let failCount = 0;

for (let i = 0; i < totalFrames; i++) {
  const t = (i / FPS);

  const pngB64 = await page.evaluate(async (seekTime) => {
    const v   = document.getElementById('v');
    const c   = document.getElementById('c');
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const W   = v.videoWidth;
    const H   = v.videoHeight;

    // Seek
    v.currentTime = seekTime;
    await new Promise(resolve => {
      v.addEventListener('seeked', resolve, { once: true });
    });

    // --- top half: RGB color (keep color as-is, alpha stripped later by H.264) ---
    ctx.clearRect(0, 0, W, H * 2);
    ctx.drawImage(v, 0, 0, W, H);

    // --- bottom half: alpha channel → grayscale matte ---
    ctx.drawImage(v, 0, H, W, H);
    const matteData = ctx.getImageData(0, H, W, H);
    const d = matteData.data;
    for (let j = 0; j < d.length; j += 4) {
      const a = d[j + 3];    // alpha channel value
      d[j]     = a;          // R = alpha
      d[j + 1] = a;          // G = alpha
      d[j + 2] = a;          // B = alpha
      d[j + 3] = 255;        // make the pixel fully opaque so PNG preserves value
    }
    ctx.putImageData(matteData, 0, H);

    return c.toDataURL('image/png').slice('data:image/png;base64,'.length);
  }, t);

  if (!pngB64 || pngB64.length < 100) {
    console.warn(`\n  Frame ${i} empty — skipping`);
    failCount++;
    continue;
  }

  writeFileSync(
    join(FRAMES_DIR, `f${String(i).padStart(5, '0')}.png`),
    Buffer.from(pngB64, 'base64')
  );

  process.stdout.write(`\r  Frame ${i + 1}/${totalFrames}  `);
}

await browser.close();
server.close();
console.log(`\n\nAll frames extracted (${failCount} failures). Encoding with FFmpeg…`);

// Encode the stacked PNG sequence → H.264 MP4 (yuv420p, lossless-ish matte)
execSync(
  [
    'ffmpeg -y',
    `-framerate ${FPS}`,
    `-i "${join(FRAMES_DIR, 'f%05d.png')}"`,
    '-c:v libx264',
    '-pix_fmt yuv420p',
    '-preset slow',
    '-crf 14',           // lower CRF = higher quality matte (less compression noise)
    '-profile:v high',
    '-level 4.2',
    '-movflags +faststart',
    '-an',
    `"${OUTPUT}"`,
  ].join(' '),
  { stdio: 'inherit' }
);

// Clean up temp frames
rmSync(FRAMES_DIR, { recursive: true });

console.log(`\nhero-matte.mp4 → ${OUTPUT}`);
