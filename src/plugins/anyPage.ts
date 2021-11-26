import { Credentials, Page } from "puppeteer";
import { runInPage } from "../scraping/runInPage";

export class anyPage {
  constructor(private readonly pageFactory: () => Promise<Page>) {}

  async open(url: string): Promise<void> {
    return runInPage(this.pageFactory, async (page: Page) => {
      await page.goto(url);
    });
  }
}
