import { createWriteStream, copyFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Ytdl } from "@distube/ytdl-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yt = new Ytdl();

async function main() {
  const url = "https://www.youtube.com/watch?v=Ct3rZomYYhw";
  console.log("Fetching video info...");
  const info = await yt.getInfo(url);

  // Pick itag 140 (AAC M4A: official iOS Safari compatible audio)
  const format140 = info.formats.find((f) => f.itag === 140) || info.formats.find((f) => f.container === "mp4" && f.hasAudio && !f.hasVideo);
  console.log("Selected format:", format140.itag, format140.mimeType, "bitrate:", format140.audioBitrate);

  const publicDir = path.join(__dirname, "..", "public");
  const destM4a = path.join(publicDir, "mahi-ta-mera.m4a");
  const destMp4 = path.join(publicDir, "mahi-ta-mera.mp4");
  const destMp3 = path.join(publicDir, "kudmayi.mp3");

  const stream = yt.download(info, { format: format140 });
  const file = createWriteStream(destM4a);
  stream.pipe(file);

  file.on("finish", () => {
    file.close();
    const size = statSync(destM4a).size;
    console.log("Downloaded official Apple AAC stream! Size:", size, "bytes");

    // Copy to mahi-ta-mera.mp4 and kudmayi.mp3
    copyFileSync(destM4a, destMp4);
    copyFileSync(destM4a, destMp3);
    console.log("All audio targets updated with official iOS Safari AAC stream!");
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}

main().catch(console.error);
