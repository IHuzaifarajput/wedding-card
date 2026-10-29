const https = require("https");

https.get("https://wedding-card-alpha-two.vercel.app/mahi-ta-mera.mp4", (res) => {
  console.log("mahi-ta-mera.mp4 status:", res.statusCode, "length:", res.headers["content-length"]);
});

https.get("https://wedding-card-alpha-two.vercel.app/kudmayi.mp3", (res) => {
  console.log("kudmayi.mp3 status:", res.statusCode, "length:", res.headers["content-length"]);
});
