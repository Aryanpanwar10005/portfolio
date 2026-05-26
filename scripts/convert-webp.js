import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const IMG_DIR = path.resolve(ROOT_DIR, 'assets', 'img');
const PROJ_DIR = path.resolve(ROOT_DIR, 'assets', 'projects');

async function convertPngToWebp(filePath) {
  const ext = path.extname(filePath);
  const webpPath = filePath.replace(ext, '.webp');
  try {
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    console.log(`Converted: ${path.relative(ROOT_DIR, filePath)} -> ${path.relative(ROOT_DIR, webpPath)}`);
    // Delete the original PNG file
    fs.unlinkSync(filePath);
    console.log(`Deleted original: ${path.relative(ROOT_DIR, filePath)}`);
  } catch (err) {
    console.error(`Failed to convert ${filePath}:`, err);
  }
}

async function convertJpgToWebp(filePath) {
  const ext = path.extname(filePath);
  const webpPath = filePath.replace(ext, '.webp');
  try {
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    console.log(`Converted: ${path.relative(ROOT_DIR, filePath)} -> ${path.relative(ROOT_DIR, webpPath)}`);
    // Note: We keep og-image.jpg because some older social platforms prefer JPG for Open Graph,
    // but having a webp copy ready is excellent for high-performance visual loading.
  } catch (err) {
    console.error(`Failed to convert ${filePath}:`, err);
  }
}

async function runConversion() {
  console.log('=== Starting WebP Assets Conversion ===');

  // Convert project pngs to webp
  const pngs = ['ai-crm-hcp.png', 'credex-spend-audit.png'];
  for (const png of pngs) {
    const pngPath = path.join(PROJ_DIR, png);
    if (fs.existsSync(pngPath)) {
      await convertPngToWebp(pngPath);
    }
  }

  // Convert og-image.jpg to webp
  const ogJpgPath = path.join(IMG_DIR, 'og-image.jpg');
  if (fs.existsSync(ogJpgPath)) {
    await convertJpgToWebp(ogJpgPath);
  }

  console.log('=== WebP Assets Conversion Completed ===');
}

runConversion();
