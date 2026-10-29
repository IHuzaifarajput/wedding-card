const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const executablePath = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

async function testScratching() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const canvasElement = await page.$("canvas.cursor-grab");
  await canvasElement.scrollIntoView();
  await new Promise((r) => setTimeout(r, 400));

  const box = await canvasElement.boundingBox();
  console.log("Canvas viewport box:", box);

  // Scratch a distinct diagonal path across the middle
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.4);
  await page.mouse.down();
  for (let i = 0; i <= 20; i++) {
    const px = box.x + box.width * (0.2 + (i / 20) * 0.6);
    const py = box.y + box.height * (0.4 + (i % 2 === 0 ? 0.05 : -0.05));
    await page.mouse.move(px, py, { steps: 3 });
    await new Promise((r) => setTimeout(r, 20));
  }
  await page.mouse.up();

  const card = await page.$(".aspect-\\[4\\/5\\], .aspect-\\[1\\/1\\.2\\]");
  const midScratchPath = path.join(__dirname, "screenshots", "mid-scratch.png");
  await card.screenshot({ path: midScratchPath });
  console.log("Saved mid-scratch screenshot to:", midScratchPath);

  await browser.close();
}

testScratching().catch(console.error);
