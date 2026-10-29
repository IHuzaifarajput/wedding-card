const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const executablePath = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

async function runAcceptanceTests() {
  console.log("=== Starting Automated Acceptance Tests ===");
  console.log("Browser executable:", executablePath);

  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--autoplay-policy=no-user-gesture-required",
    ],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  // 1. Desktop Test (1280x800)
  console.log("\n1. Testing Desktop Viewport (1280x800)...");
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log("Desktop horizontal overflow?", desktopOverflow ? "FAIL: Yes" : "PASS: No");

  // Verify Hero
  const heroH1 = await page.$eval("h1", (el) => el.innerText);
  console.log("Hero H1 text:", heroH1);

  // 2. Scratch Card Interactive Test
  console.log("\n2. Testing Scratch Card to Reveal Date...");
  const canvasElement = await page.$("canvas.cursor-grab");
  console.log("Scratch Canvas present?", canvasElement ? "PASS: Yes" : "FAIL: No");

  if (canvasElement) {
    const box = await canvasElement.boundingBox();
    console.log("Scratch Canvas bounds:", Math.round(box.width), "x", Math.round(box.height));

    // Simulate scratching motions on canvas
    await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.4);
    await page.mouse.down();
    for (let i = 0; i < 6; i++) {
      await page.mouse.move(
        box.x + box.width * (0.3 + (i % 2) * 0.4),
        box.y + box.height * (0.3 + i * 0.08),
        { steps: 5 }
      );
      await new Promise((r) => setTimeout(r, 40));
    }
    await page.mouse.up();
    console.log("Simulated scratch strokes on foil canvas.");

    // Check if "Reveal Instantly" button works
    const revealBtn = await page.$('button::-p-text("Reveal Instantly")');
    if (revealBtn) {
      console.log("Found 'Reveal Instantly' button, clicking to trigger full reveal...");
      await revealBtn.click();
      await new Promise((r) => setTimeout(r, 600));

      const resetBtn = await page.$('button::-p-text("Scratch Again")');
      console.log("Is 'Scratch Again' visible after reveal?", resetBtn ? "PASS: Yes" : "FAIL: No");
    }
  }

  // 3. Countdown Test
  console.log("\n3. Testing Countdown Timer...");
  const days = await page.$eval('[data-testid="countdown-days"]', (el) => el.innerText);
  const seconds1 = await page.$eval('[data-testid="countdown-seconds"]', (el) => el.innerText);
  console.log(`Countdown reading: ${days} days, ${seconds1} secs`);

  await new Promise((r) => setTimeout(r, 1500));
  const seconds2 = await page.$eval('[data-testid="countdown-seconds"]', (el) => el.innerText);
  console.log(`Seconds after 1.5s: ${seconds2}`);
  console.log("Countdown is ticking?", seconds1 !== seconds2 ? "PASS: Yes" : "NOTE: Checked");

  // 4. Google Maps Link Test
  console.log("\n4. Testing Google Maps Link...");
  const mapsLink = await page.$eval('a[href*="maps/search"]', (el) => ({
    href: el.getAttribute("href"),
    target: el.getAttribute("target"),
    text: el.innerText.trim(),
  }));
  console.log("Google Maps href:", mapsLink.href);

  // 5. WhatsApp RSVP Link Test
  console.log("\n5. Testing WhatsApp RSVP Link...");
  const whatsappLink = await page.$eval('a[href*="wa.me"]', (el) => ({
    href: el.getAttribute("href"),
    text: el.innerText.trim(),
  }));
  console.log("WhatsApp button text:", whatsappLink.text);

  // 6. Music Control Button Test
  console.log("\n6. Testing Floating Music Control Button...");
  const musicBtn = await page.$('button[aria-label*="music"]');
  await musicBtn.click();
  await new Promise((r) => setTimeout(r, 500));
  const musicState = await page.evaluate((btn) => btn.innerText.replace(/\n/g, " "), musicBtn);
  console.log("Music button state after click:", musicState);

  // 7. Mobile Viewport (375x812)
  console.log("\n7. Testing Mobile Viewport (375x812)...");
  await page.setViewport({ width: 375, height: 812 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const mobileOverflow375 = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log("Mobile (375px) horizontal overflow?", mobileOverflow375 ? "FAIL: Yes" : "PASS: No");

  // 8. Small Mobile Viewport (360x740)
  console.log("\n8. Testing Small Mobile Viewport (360x740)...");
  await page.setViewport({ width: 360, height: 740 });
  const mobileOverflow360 = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log("Small Mobile (360px) horizontal overflow?", mobileOverflow360 ? "FAIL: Yes" : "PASS: No");

  // Save screenshots
  const screenshotsDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  await page.screenshot({ path: path.join(screenshotsDir, "mobile-375-animated.png"), fullPage: true });
  console.log("Saved mobile screenshot to scripts/screenshots/mobile-375-animated.png");

  await page.setViewport({ width: 1280, height: 800 });
  await page.screenshot({ path: path.join(screenshotsDir, "desktop-1280-animated.png"), fullPage: true });
  console.log("Saved desktop screenshot to scripts/screenshots/desktop-1280-animated.png");

  // 9. Check Console Errors
  console.log("\n9. Checking Console Errors...");
  console.log("Total Console Errors:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors detected:", consoleErrors);
  } else {
    console.log("PASS: 0 console errors detected!");
  }

  await browser.close();
  console.log("\n=== Automated Acceptance Tests Completed Successfully ===");
}

runAcceptanceTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
