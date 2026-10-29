const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const executablePath = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

async function checkVisual() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Scroll to the Scratch Date section
  const dateSection = await page.$("section:has(canvas.cursor-grab)");
  if (dateSection) {
    await dateSection.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));

    // Capture screenshot of the scratch card specifically
    const card = await page.$(".aspect-\\[4\\/5\\], .aspect-\\[1\\/1\\.2\\]");
    if (card) {
      const cardPath = path.join(__dirname, "screenshots", "scratch-card-opaque.png");
      await card.screenshot({ path: cardPath });
      console.log("Saved scratch card screenshot to:", cardPath);
    }
  }

  await browser.close();
  console.log("Done visual check.");
}

checkVisual().catch(console.error);
