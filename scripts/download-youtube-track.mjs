import { createWriteStream, copyFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Ytdl, Quality } from "@distube/ytdl-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yt = new Ytdl();

async function main() {
  const url = "https://www.youtube.com/watch?v=Ct3rZomYYhw";
  console.log("Fetching video info for:", url);

  const info = await yt.getInfo(url);
  console.log("Title:", info.videoDetails.title);
  console.log("Author:", info.videoDetails.author?.name);
  console.log("Length (s):", info.videoDetails.lengthSeconds);

  const targetPath = path.join(__dirname, "..", "public", "mahi-ta-mera.mp4");
  const destMp3 = path.join(__dirname, "..", "public", "kudmayi.mp3");
  const destWav = path.join(__dirname, "..", "public", "kudmayi.wav");

  const stream = yt.download(info, {
    quality: Quality.HighestAudio,
    filter: { hasAudio: true, hasVideo: false },
  });

  const file = createWriteStream(targetPath);
  stream.pipe(file);

  file.on("finish", () => {
    file.close();
    const size = statSync(targetPath).size;
    console.log("Successfully downloaded audio stream! File size:", size);

    // Also copy to kudmayi.mp3 and kudmayi.wav
    copyFileSync(targetPath, destMp3);
    copyFileSync(targetPath, destWav);
    console.log("Copied to public/kudmayi.mp3 and public/kudmayi.wav!");
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}

main().catch(console.error);
