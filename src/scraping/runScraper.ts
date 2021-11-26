import { bbScraper } from "../bb/bbScraper";
import { outlookScraper } from "../outlook/outlookScraper";
import { anyPage } from "../plugins/anyPage";
import { Credentials } from "puppeteer";
import { argsValidator } from "../validators/argsValidator";
import { validatedURLs } from "../validators/urlValidator";
import { wuScraper } from "../wu/wuScraper";
import { runInBrowser } from "./runBrowser";
import { Settings } from "../models/settings.model";
import { Browser } from "puppeteer";
import { validateField } from "../validators/validation";
import { usernameValidator } from "../validators/usernameValidator";

export async function runScraper(
  settings: Settings,
  args: object,
  options: object
): Promise<void> {
  const URLs = validatedURLs(settings.websitesToOpen);
  await usernameValidator(settings);
  if (
    URLs.length != 0 ||
    settings.autoLogin.wu ||
    settings.autoLogin.bb ||
    settings.autoLogin.outlook
  )
    runInBrowser(async (browser) => {
      await autoLogin(browser, settings, args);
      await openURLs(browser, URLs);
    }, options);
}

async function openURLs(browser: Browser, URLs: string[]) {
  URLs.forEach(async (url) => {
    await new anyPage(() => browser.newPage()).open(url);
  });
}

async function autoLogin(browser: Browser, settings: Settings, args: object) {
  argsValidator(args, "password", "string");
  const password = args["password"];

  const credentials: Credentials = {
    username: settings.userData.username,
    password: password,
  };

  if (settings.autoLogin.wu)
    await new wuScraper(() => browser.newPage()).scrape(credentials);
  if (settings.autoLogin.bb)
    await new bbScraper(() => browser.newPage()).scrape(credentials);
  if (settings.autoLogin.outlook)
    await new outlookScraper(() => browser.newPage()).scrape(credentials);
}
