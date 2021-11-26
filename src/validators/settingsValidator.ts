import { Settings } from "../models/settings.model";
import { validateField } from "./validation";

export function settingsValidator(settings: Settings): void {
  validateField("settings", settings, "object");
  validateField("settings.userData", settings.userData, "object");
  validateField("settings.autoLogin", settings.userData, "object");
  validateField("settings.autoLogin.wu", settings.autoLogin.wu, "boolean");
  validateField("settings.autoLogin.bb", settings.autoLogin.bb, "boolean");
  validateField(
    "settings.autoLogin.outlook",
    settings.autoLogin.outlook,
    "boolean"
  );
  validateField("settings.websitesToOpen", settings.websitesToOpen, "object");
  validateField(
    "settings.mouseSettings.mousePrecision",
    settings.mouseSettings.mousePrecision,
    "boolean"
  );
  validateField(
    "settings.mouseSettings.mouseSpeed",
    settings.mouseSettings.mouseSpeed,
    "number"
  );
}
