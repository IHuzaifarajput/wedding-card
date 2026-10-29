const fs = require("fs");
const path = require("path");

// 16x16 32-bit BMP ICO format
const width = 16;
const height = 16;
const bpp = 32;
const numColors = 0;
const xorSize = width * height * 4;
const andSize = Math.ceil(width / 32) * 4 * height;
const bmpHeaderSize = 40;
const imageSize = bmpHeaderSize + xorSize + andSize;

const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // ICO format
icoHeader.writeUInt16LE(1, 4); // 1 image

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(width, 0);
dirEntry.writeUInt8(height, 1);
dirEntry.writeUInt8(numColors, 2);
dirEntry.writeUInt8(0, 3); // Reserved
dirEntry.writeUInt16LE(1, 4); // Color planes
dirEntry.writeUInt16LE(bpp, 6); // Bits per pixel
dirEntry.writeUInt32LE(imageSize, 8); // Image data size
dirEntry.writeUInt32LE(22, 12); // Offset to image data (6 + 16 = 22)

const bmpHeader = Buffer.alloc(bmpHeaderSize);
bmpHeader.writeUInt32LE(bmpHeaderSize, 0);
bmpHeader.writeInt32LE(width, 4);
bmpHeader.writeInt32LE(height * 2, 8); // Height doubled for ICO mask
bmpHeader.writeUInt16LE(1, 12); // Planes
bmpHeader.writeUInt16LE(bpp, 14); // Bit count
bmpHeader.writeUInt32LE(0, 16); // Compression (BI_RGB)
bmpHeader.writeUInt32LE(xorSize + andSize, 20); // Image size
bmpHeader.writeInt32LE(0, 24); // X pixels per meter
bmpHeader.writeInt32LE(0, 28); // Y pixels per meter
bmpHeader.writeUInt32LE(0, 32); // Colors used
bmpHeader.writeUInt32LE(0, 36); // Important colors

// Deep Maroon background (#370914) with Gold (#BA8A45) dot in center
const pixelData = Buffer.alloc(xorSize);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const isBorder = x === 0 || x === 15 || y === 0 || y === 15;
    const isCenter = (x >= 6 && x <= 9) && (y >= 6 && y <= 9);

    if (isCenter) {
      // Gold (#D7B87B) in BGRA
      pixelData[idx] = 0x7B; // B
      pixelData[idx + 1] = 0xB8; // G
      pixelData[idx + 2] = 0xD7; // R
      pixelData[idx + 3] = 0xFF; // A
    } else if (isBorder) {
      // Muted Gold border (#BA8A45)
      pixelData[idx] = 0x45;
      pixelData[idx + 1] = 0x8A;
      pixelData[idx + 2] = 0xBA;
      pixelData[idx + 3] = 0xFF;
    } else {
      // Deep Maroon (#370914)
      pixelData[idx] = 0x14;
      pixelData[idx + 1] = 0x09;
      pixelData[idx + 2] = 0x37;
      pixelData[idx + 3] = 0xFF;
    }
  }
}

const andMask = Buffer.alloc(andSize, 0); // all opaque

const icoBuffer = Buffer.concat([icoHeader, dirEntry, bmpHeader, pixelData, andMask]);
const publicDir = path.join(__dirname, "..", "public");
fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
console.log("Generated valid public/favicon.ico:", icoBuffer.length, "bytes");

