import { Credentials, Page } from "puppeteer";
import { runInPage } from "../scraping/runInPage";

export class bbScraper {
  constructor(private readonly pageFactory: () => Promise<Page>) {}

  async scrape(credentials: Credentials): Promise<void> {
    return runInPage(this.pageFactory, async (page: Page) => {
      await this.login(page, credentials);
    });
  }

  private async login(page: Page, credentials: Credentials) {
    await page.goto("https://bb.wsiz.pl/");
    await page
      .waitForSelector("#agree_button")
      .then(async () => await page.click("#agree_button"));
    await page.type("#user_id", credentials.username);
    await page.type("#password", credentials.password);

    await Promise.all([page.waitForNavigation(), page.click("#entry-login")]);
  }
}
