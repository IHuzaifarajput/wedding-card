const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--autoplay-policy=no-user-gesture-required"],
  });
  const page = await browser.newPage();
  page.on("requestfailed", (req) => console.log("Failed request:", req.url(), req.failure()));
  page.on("response", (res) => {
    if (res.status() >= 400) console.log("Error status:", res.status(), res.url());
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Test audio file directly
  const audioStatus = await page.evaluate(async () => {
    try {
      const resp = await fetch("/kudmayi.mp3");
      return { status: resp.status, ok: resp.ok, contentType: resp.headers.get("content-type") };
    } catch (e) {
      return { error: e.message };
    }
  });
  console.log("kudmayi.mp3 fetch status:", audioStatus);

  await browser.close();
})();

