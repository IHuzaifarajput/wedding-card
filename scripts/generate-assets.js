const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Minimal valid silent MP3 frame (104 bytes per frame)
const frameHex = "fffb90640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
const mp3Buffer = Buffer.from(frameHex.repeat(50), "hex");
fs.writeFileSync(path.join(publicDir, "kudmayi.mp3"), mp3Buffer);
console.log("Created public/kudmayi.mp3:", mp3Buffer.length, "bytes");

// Minimal valid 1x1 JPEG placeholder for og-image.jpg
const jpegBase64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
fs.writeFileSync(path.join(publicDir, "og-image.jpg"), Buffer.from(jpegBase64, "base64"));
console.log("Created public/og-image.jpg");

