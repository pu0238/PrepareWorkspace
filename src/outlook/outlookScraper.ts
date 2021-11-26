import { Credentials, Page } from "puppeteer";
import { runInPage } from "../scraping/runInPage";

export class outlookScraper {
  constructor(private readonly pageFactory: () => Promise<Page>) {}

  async scrape(credentials: Credentials): Promise<void> {
    return runInPage(this.pageFactory, async (page: Page) => {
      await this.login(page, credentials);
    });
  }

  private async login(page: Page, credentials: Credentials) {
    await page.goto(
      `https://sts.wsiz.rzeszow.pl/adfs/ls/?client-request-id=353056b7-a71e-44cf-886c-b3b872c0bc1a&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQIIAYWSPYzbdBjG4-QuXEMRRzmh0gFlYEBUdv7--287iYSEEzuX3PmjTnxJnSVK_JE4_ow_4rOnTqhjpw4dWZBuhKEVYuh8C51vZGRCTIwEmCuG99X7PO-zPb_GCUOQkCAJ8HUNEqD7JWIZGiF6hVPQYHDUWQG8TVkMTpod6vCCLGMs4weN09dTQH_xw6_8c--nN_HbXx7dYM1NmkZJt9XK85wIbdsxLMII_Za3DEwnWO_hGwx7h2GvqseRhz8Rb6oJQ7EsBVCb7iCKRQi1EaFrPVfWNpv51k11TaX1AgCJVwtxJpQyHB28saP7h9G4XDqf-7I_3cr8wJnzUqrMrgqlf8jDgSfOLnxJU1NJE0hd03PJlwqZ1_O76scKl6Ub-M8KY6e0_qzes8PYX0Rhkr6qvayOYXpxbZuFFLuiR4viaNsJylW_vXgyMRVyOgKqnlmkpQyo7ZYTcZXpl1a2La6HRV8OlGSiTzopFxcXqx6QPJZVDFnmF7u1vQ_5S8OVVuYQAnc-oEHmKucL48JFqYSsmJ0j0xWgffk00Z-qgrnOZv3eEg9Klud3Ro_eyJudvKLZ5d7OyZ08nQgOjfjzXBUtWuHEPn-5VZWrUaEXvmCTsZ3jbTEVhvEs2uHXwyUnMxpwyIU5sFeiP1BYJouHbZdXzleOxk0nu6VdpmIQecVwHieeR_rtie4NLPdKB_284G5qn7-n3j38sVY_HH4Y3NbYMLICx2xGcWg7nvU-JPawpfyrhqFvEZzn_VZ7lDOIROS3SZqZVpASeeKUhGVmROS9O8J-P_rspH56_yHWrHx1Bmrdk5PGaeVhpVn56wj7_viA43dnz3gcvlaejbzOy_WHldvjViRTymO_tMZoK_fUcQtapi4o03VqciC47vuqzzrl_jHoBPo3oEu-qGMv6vXb-icjfiEL2kTjZJ4b83AB_qhjzz-o_HzvfwG_a5xBAEmcJHEImpDqIqpL0vO7-582Gpmz8EJj6VnJg__4f_tR5W81&cbcxt=&username=${credentials.username}%40student.wsiz.edu.pl&mkt=pl-PL&lc=`
    );
    await page.type("#passwordInput", credentials.password);
    await page.click("#submitButton");
    await page
      .waitForSelector("#idBtn_Back")
      .then(async () => await page.click("#idBtn_Back"));
  }
}
