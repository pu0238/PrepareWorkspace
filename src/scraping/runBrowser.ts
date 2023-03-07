import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

export async function runInBrowser<T>(
  callback: (browser: Browser) => Promise<T>,
  options:  object
) {

    const browser = await puppeteer.launch({
      headless: false,
      devtools: false,
      defaultViewport: null,
      ...options
    });
    return await callback(browser);
  } 


