import minimist from "minimist";
import { bbScraper } from "./bb/bbScraper";
import { Credentials } from "./models/credentials.model";
import { outlookScraper } from "./outlook/outlookScraper";
import { runInBrowser } from "./scraping/runBrowser";
import { wuScraper } from "./wu/wuScraper";
import { settingsValidator } from "./validators/settingsValidator";
import { validatedURLs, validateURL } from "./validators/urlValidator";
import settings from "./settings.json";
import { anyPage } from "./plugins/anyPage";
import { argsValidator } from "./validators/argsValidator";
import { setMouseSettings } from "./mouse/setMouseSettings";
import { runScraper } from "./scraping/runScraper";

const args = minimist(process.argv.slice(2), { string: "password" });

(async () => {
  const options = {};
  settingsValidator(settings);
  setMouseSettings(
    settings.mouseSettings.mousePrecision,
    settings.mouseSettings.mouseSpeed
  );

  if (args.hasOwnProperty("pathToChrome")) {
    argsValidator(args, "pathToChrome", "string");
    options["executablePath"] = args.pathToChrome;
  }

  await runScraper(settings, args, options)

})().catch((err) => console.error(err));
//ts-node src/index.ts --password password
