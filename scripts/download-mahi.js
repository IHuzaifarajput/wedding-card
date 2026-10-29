const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

function getJson(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 8000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return getJson(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("Timeout")));
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 20000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error("Status " + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(fs.statSync(dest).size);
      });
      file.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("Timeout")));
  });
}

async function main() {
  const videoId = "Ct3rZomYYhw";

  const pipedInstances = [
    "https://pipedapi.kavin.rocks",
    "https://api.piped.privacydev.net",
    "https://piped-api.lunar.icu",
    "https://api.piped.projectsegfau.lt",
  ];

  console.log("Checking Piped API instances...");
  for (const uri of pipedInstances) {
    console.log("Trying Piped:", uri);
    try {
      const data = await getJson(`${uri}/streams/${videoId}`);
      if (data && data.audioStreams && data.audioStreams.length > 0) {
        const stream = data.audioStreams[0];
        console.log("Found Piped audio stream! Format:", stream.format, "Bitrate:", stream.bitrate);
        console.log("Audio URL:", stream.url.slice(0, 80));

        const destMp3 = path.join(__dirname, "..", "public", "kudmayi.mp3");
        const bytes = await downloadFile(stream.url, destMp3);
        console.log("Downloaded audio bytes:", bytes);
        fs.copyFileSync(destMp3, path.join(__dirname, "..", "public", "kudmayi.wav"));
        console.log("Done! Replaced kudmayi.mp3 with Mahi Ta Mera!");
        return;
      }
    } catch (e) {
      console.log("Piped instance failed:", uri, e.message);
    }
  }

  // Also check Invidious
  console.log("Checking Invidious instances...");
  const rawList = await getJson("https://api.invidious.io/instances.json");
  const uris = rawList.map((item) => item[1].uri);

  for (const uri of uris) {
    console.log("Trying Invidious:", uri);
    try {
      const data = await getJson(`${uri}/api/v1/videos/${videoId}`);
      const audioStreams = (data.adaptiveFormats || []).filter((f) => f.type && f.type.includes("audio"));
      if (audioStreams.length > 0) {
        const stream = audioStreams[0];
        console.log("Found stream:", stream.url);
        const destMp3 = path.join(__dirname, "..", "public", "kudmayi.mp3");
        const bytes = await downloadFile(stream.url, destMp3);
        console.log("Downloaded audio bytes:", bytes);
        fs.copyFileSync(destMp3, path.join(__dirname, "..", "public", "kudmayi.wav"));
        return;
      }
    } catch (e) {
      console.log("Invidious failed:", uri, e.message);
    }
  }
}

main().catch(console.error);
