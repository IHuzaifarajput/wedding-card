const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--autoplay-policy=no-user-gesture-required"],
  });

  const page = await browser.newPage();
  await page.goto("https://wedding-card-alpha-two.vercel.app", { waitUntil: "domcontentloaded" });

  await new Promise((r) => setTimeout(r, 1500));

  const isAudioPlaying = await page.evaluate(() => {
    const audio = document.querySelector("audio");
    return audio ? !audio.paused : false;
  });

  console.log("Audio playing automatically on load?", isAudioPlaying);

  const btnText = await page.$eval('button[aria-label*="music"]', (el) => el.innerText.replace(/\n/g, " "));
  console.log("Music button state:", btnText);

  await browser.close();
})();
