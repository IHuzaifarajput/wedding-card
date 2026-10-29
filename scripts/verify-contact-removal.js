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

  const contactText = await page.evaluate(() => {
    const el = document.querySelector('section:has(a[href^="tel:"])');
    return el ? el.innerText : "";
  });

  console.log("Contact section text:");
  console.log(contactText);
  console.log("Has Kashaf's Family?", contactText.includes("Kashaf’s Family") || contactText.includes("Kashaf's Family"));
  console.log("Has Huziafa's Family?", contactText.includes("Huziafa’s Family") || contactText.includes("Huziafa's Family"));

  await page.screenshot({ path: "scripts/screenshots/contact-updated.png" });
  await browser.close();
})();

