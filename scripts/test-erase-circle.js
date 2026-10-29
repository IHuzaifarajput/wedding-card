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
    const ctx = canvas.getContext("2d");

    // Erase a large circle in the middle
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    return canvas.toDataURL();
  });

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("scripts/screenshots/canvas-after-erase.png", base64Data, "base64");
  console.log("Canvas after erase saved. Length:", base64Data.length);

  await browser.close();
})();
