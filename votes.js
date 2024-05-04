import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

export const getVotes = async (id) => {
  const browser = await puppeteer.launch({
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
  const page = await browser.newPage();

  await page.goto(`https://voting.lgamingawards.com/participant?p=${id}`, {
    waitUntil: "networkidle2",
  });

  const searchResultSelector = '.baTaHaFv > div';
  await page.waitForSelector(searchResultSelector);  
  const votes = await page.$eval(searchResultSelector, el => el.textContent)

  await browser.close();

  return votes
};
