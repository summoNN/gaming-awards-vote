import puppeteer from "puppeteer";

export const getVotes = async (id) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
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
