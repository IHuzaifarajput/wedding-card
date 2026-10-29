const https = require("https");

https.get("https://wedding-card-alpha-two.vercel.app/kudmayi.wav", (res) => {
  console.log("kudmayi.wav status:", res.statusCode, "length:", res.headers["content-length"]);
});

https.get("https://wedding-card-alpha-two.vercel.app/kudmayi.mp3", (res) => {
  console.log("kudmayi.mp3 status:", res.statusCode, "length:", res.headers["content-length"]);
});

