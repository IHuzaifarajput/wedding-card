const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function main() {
  const server = spawn("npx", ["next", "start", "-p", "3002"], { shell: true, stdio: "inherit" });
  await new Promise(r => setTimeout(r, 4000));

  try {
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 428, height: 926, isMobile: true, hasTouch: true });
    await page.goto("http://localhost:3002", { waitUntil: "networkidle2" });

    const content = await page.content();
    console.log("Has Grand Hayat:", content.includes("Grand Hayat Luxury Banquet"));
    console.log("Has maps link:", content.includes("https://maps.app.goo.gl/UuqkycSs9goaqsxU7"));
    console.log("Has Kamran Ahmed:", content.includes("Kamran Ahmed"));
    console.log("Has Daughter of:", content.includes("Daughter of"));
    console.log("Has Kashaf:", /kashaf/i.test(content));

    // Check for any horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log("Horizontal overflow detected?", overflow);

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch(console.error);
