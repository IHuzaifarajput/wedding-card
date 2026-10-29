const https = require("https");
const fs = require("fs");
const path = require("path");

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, data: Buffer.concat(chunks), headers: res.headers }));
      res.on("error", reject);
    });
  });
}

async function main() {
  console.log("Checking metadata...");
  const metaRes = await get("https://archive.org/metadata/soundcloud-382924121");
  const meta = JSON.parse(metaRes.data.toString("utf8"));
  const mp3File = meta.files.find((f) => f.name.endsWith(".mp3"));
  console.log("Found mp3 file:", mp3File);

  if (mp3File) {
    const downloadUrl = `https://archive.org/download/soundcloud-382924121/${encodeURIComponent(mp3File.name)}`;
    console.log("Downloading from:", downloadUrl);
    const downloadRes = await get(downloadUrl);
    console.log("Downloaded size:", downloadRes.data.length, "Status:", downloadRes.statusCode);

    if (downloadRes.statusCode === 200 && downloadRes.data.length > 50000) {
      const targetPath = path.join(__dirname, "..", "public", "kudmayi.mp3");
      fs.writeFileSync(targetPath, downloadRes.data);
      console.log("Successfully saved real audio to:", targetPath);
    }
  }
}

main().catch(console.error);

