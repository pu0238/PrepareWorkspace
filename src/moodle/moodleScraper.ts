import { Credentials, Page } from "puppeteer";
import { runInPage } from "../scraping/runInPage";

export class moodleScraper {
  constructor(private readonly pageFactory: () => Promise<Page>) {}

  async scrape(credentials: Credentials): Promise<void> {
    return runInPage(this.pageFactory, async (page: Page) => {
      await this.login(page, credentials);
    });
  }

  private async login(page: Page, credentials: Credentials) {
    await page.goto("https://moodle.wsiz.edu.pl/login/index.php");
    await page.type("#username", credentials.username);
    await page.type("#password", credentials.password);

    await Promise.all([page.waitForNavigation(), page.click("#loginbtn")]);
  }
}
