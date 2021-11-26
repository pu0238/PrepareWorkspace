import { Settings } from "../models/settings.model";
import { validateField } from "./validation";

export function usernameValidator(settings: Settings) {
  if (
    settings.autoLogin.wu ||
    settings.autoLogin.bb ||
    settings.autoLogin.outlook
  )
    validateField(
      "settings.userData.username",
      settings.userData.username,
      "string"
    );
}
