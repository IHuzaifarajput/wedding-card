import { Ytdl } from "@distube/ytdl-core";
const yt = new Ytdl();

async function main() {
  const info = await yt.getInfo("https://www.youtube.com/watch?v=Ct3rZomYYhw");
  const audioFormats = info.formats.filter((f) => f.hasAudio && !f.hasVideo);
  console.log("Audio formats available:");
  audioFormats.forEach((f) => {
    console.log(`itag: ${f.itag}, container: ${f.container}, codec: ${f.audioCodec}, bitrate: ${f.audioBitrate}, mime: ${f.mimeType}`);
  });
}

main().catch(console.error);

