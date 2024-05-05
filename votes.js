import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

let browserInstance;

const launchBrowser = async () => {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
      headless: true,
      defaultViewport: null,
      executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    });
  }
  return browserInstance;
};

export const getVotes = async (id) => {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(`https://voting.lgamingawards.com/participant?p=${id}`, {
      waitUntil: "networkidle2",
    });

    const votes = await page.$eval('.baTaHaFv > div', el => el.textContent);

    return votes;
  } finally {
    await page.close();
  }
};