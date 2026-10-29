const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  await page.evaluate(() => {
    const canvas = document.querySelector("canvas.cursor-grab");
    const ctx = canvas.getContext("2d");
    // Reset transform to 1:1 pixel coords
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  const card = await page.$(".aspect-\\[4\\/5\\], .aspect-\\[1\\/1\\.2\\]");
  await card.screenshot({ path: "scripts/screenshots/hole-test.png" });
  await browser.close();
  console.log("Hole test completed.");
})();
