const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/assets/sawa-nav-logo.png');
const outputPath = path.join(__dirname, '../public/assets/sawa-nav-logo.png');

// Dark grey background to make transparent (RGB ~51,51,51 = #333333)
const BG_R = 51, BG_G = 51, BG_B = 51;
const TOLERANCE = 35; // How close to background color to consider as background

async function removeBackground() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const dist = Math.sqrt(
      (r - BG_R) ** 2 + (g - BG_G) ** 2 + (b - BG_B) ** 2
    );
    if (dist <= TOLERANCE) {
      pixels[i + 3] = 0; // Set alpha to 0 for background
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width, height, channels }
  })
    .png()
    .toFile(outputPath);

  console.log('Background removed successfully');
}

removeBackground().catch(console.error);
