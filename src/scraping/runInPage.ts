import { Page } from "puppeteer";

export async function runInPage<T>(
  pageFactory: () => Promise<Page>,
  callback: (page: Page) => Promise<T>
) {
  const page = await pageFactory();

  return await callback(page);
}
