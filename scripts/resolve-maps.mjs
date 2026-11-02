import https from "node:https";

const url = "https://maps.app.goo.gl/UuqkycSs9goaqsxU7";

function get(u) {
  return new Promise((resolve, reject) => {
    https.get(u, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve({ url: u, data, headers: res.headers }));
    }).on("error", reject);
  });
}

async function main() {
  const result = await get(url);
  console.log("Final URL:", result.url);
  const titleMatch = result.data.match(/<title>([^<]+)<\/title>/);
  console.log("Title:", titleMatch ? titleMatch[1] : "None");
}

main().catch(console.error);

