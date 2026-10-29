const puppeteer = require("puppeteer-core");
const fs = require("fs");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const dataUrl = await page.evaluate(() => {
    const canvas = document.querySelector("canvas.cursor-grab");
    return canvas.toDataURL();
  });

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("scripts/screenshots/canvas-direct-export.png", base64Data, "base64");
  console.log("Canvas direct export saved. Length:", base64Data.length);

  await browser.close();
})();
