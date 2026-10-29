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

  const pageText = await page.evaluate(() => document.body.innerText);
  console.log("Has 'INTERACTIVE INVITATION'?", pageText.includes("INTERACTIVE INVITATION"));
  console.log("Music button text:", await page.$eval('button[aria-label*="music"]', el => el.innerText.replace(/\n/g, ' ')));

  await browser.close();
})();

