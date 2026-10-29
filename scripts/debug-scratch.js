const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.on("console", (m) => console.log("BROWSER LOG:", m.text()));
  page.on("pageerror", (err) => console.log("BROWSER ERROR:", err.message));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const result = await page.evaluate(() => {
    const canvas = document.querySelector("canvas.cursor-grab");
    if (!canvas) return { error: "no canvas" };

    const ctx = canvas.getContext("2d");
    // Check initial pixel alpha in center
    const d1 = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;

    // Erase a test rect right in center
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Check pixel alpha after erase
    const d2 = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;

    return {
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      pixelBefore: Array.from(d1),
      pixelAfter: Array.from(d2),
    };
  });

  console.log("Canvas test result:", result);

  // Take screenshot of this erased canvas
  const card = await page.$(".aspect-\\[4\\/5\\], .aspect-\\[1\\/1\\.2\\]");
  await card.screenshot({ path: "scripts/screenshots/direct-erase-test.png" });

  await browser.close();
})();
