const https = require("https");
https.get("https://api.invidious.io/instances.json", { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
  let data = "";
  res.on("data", c => data += c);
  res.on("end", () => {
    const list = JSON.parse(data);
    console.log("Count:", list.length);
    console.log("Sample:", list[0]);
  });
});
