import { Credentials, Page } from "puppeteer";
import { runInPage } from "../scraping/runInPage";

export class wuScraper {
  constructor(private readonly pageFactory: () => Promise<Page>) {}

  async scrape(credentials: Credentials): Promise<void> {
    return runInPage(this.pageFactory, async (page: Page) => {
      await this.login(page, credentials);
    });
  }

  private async login(page: Page, credentials: Credentials) {
    await page.goto("https://wu.wsiz.edu.pl/Account/Login");
    await page.type("#UserLogin_I", credentials.username);
    await page.type("#Password_I", credentials.password);

    await Promise.all([page.waitForNavigation(), page.click("#button")]);
  }
}
