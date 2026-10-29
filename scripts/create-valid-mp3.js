const fs = require("fs");
const path = require("path");

// Real MPEG-1 Layer 3, 128 kbps, 44.1 kHz, Joint Stereo
// Frame length = 144 * 128000 / 44100 = 417 bytes
const frameLength = 417;
const numFrames = 50; // ~1.3 seconds
const buffer = Buffer.alloc(frameLength * numFrames);

for (let i = 0; i < numFrames; i++) {
  const offset = i * frameLength;
  buffer[offset] = 0xFF;
  buffer[offset + 1] = 0xFB; // MPEG 1 Layer 3, no CRC
  buffer[offset + 2] = 0x90; // 128 kbps, 44.1 kHz, no padding
  buffer[offset + 3] = 0x64; // Joint stereo
  // side info & main data = 0
}

fs.writeFileSync(path.join(__dirname, "..", "public", "kudmayi.mp3"), buffer);
console.log("Written 417-byte valid MP3 frames:", buffer.length);

