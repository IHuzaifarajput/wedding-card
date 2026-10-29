const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://wedding-card-alpha-two.vercel.app", { waitUntil: "networkidle0" });

  const title = await page.title();
  const h1 = await page.$eval("h1", (el) => el.innerText);
  const scratchCanvas = await page.$("canvas.cursor-grab");

  console.log("=== Vercel Live Verification ===");
  console.log("Page Title:", title);
  console.log("H1 text:", h1);
  console.log("Scratch Canvas loaded?", scratchCanvas ? "YES!" : "NO");

  await page.screenshot({ path: "scripts/screenshots/live-vercel.png" });
  console.log("Saved live screenshot to scripts/screenshots/live-vercel.png");

  await browser.close();
})();

