import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, "../public/icons");

const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="108" fill="#0a1a2e"/>
  <circle cx="256" cy="200" r="140" fill="#00F4FE" opacity="0.9"/>
  <circle cx="256" cy="200" r="120" fill="#226397"/>
  <text x="256" y="300" font-family="Arial, Helvetica, sans-serif" font-size="168" font-weight="700" fill="#FFEC7C" text-anchor="middle">OC</text>
</svg>`;

await mkdir(iconsDir, { recursive: true });

const buffer = Buffer.from(svg);

await sharp(buffer).png().toFile(join(iconsDir, "icon-512x512.png"));
await sharp(buffer).resize(192, 192).png().toFile(join(iconsDir, "icon-192x192.png"));
await sharp(buffer).resize(180, 180).png().toFile(join(iconsDir, "apple-touch-icon.png"));

await writeFile(join(iconsDir, "icon.svg"), svg);

console.log("PWA icons generated in public/icons/");
