import { Settings } from "./models/settings.model";
import { settingsValidator } from "./validators/settingsValidator";
import { setMouseSettings } from "./mouse/setMouseSettings";
import { runScraper } from "./scraping/runScraper";
import * as fs from "fs";
import promptSync from "prompt-sync";

const main = async (options: any, password: string) => {
  if (!fs.existsSync("./settings.json")) {
    return console.error('Nie znalezionuo pliku "settings.json"');
  }
  const settings: Settings = JSON.parse(
    fs.readFileSync("./settings.json", "utf8")
  );

  settingsValidator(settings);
  setMouseSettings(
    settings.mouseSettings.mousePrecision,
    settings.mouseSettings.mouseSpeed
  );

  for (const path of settings.chromePaths) {
    if (fs.existsSync(path)) {
      console.log("Uruchomiono chrome! :D");
      options["executablePath"] = path;
      await runScraper(settings, password, options).catch((err) =>
        console.error(err)
      );
      break;
    } else {
      console.error("Nie znaleziono chrome pod ścieżką:", path);
    }
  }
};

(async () => {
  const options = {};
  const prompt = promptSync();
  const password = prompt.hide("Podaj haslo: ");
  await main(options, password);
  const exit = prompt.hide("Wcisnij enter aby zakonczyc program!");
  process.exit(0);
})();
