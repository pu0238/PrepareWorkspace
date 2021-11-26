const addon = require("../../nodeAddons/addon.node");

export function setMouseSettings(
  mousePrecision: boolean,
  setMouseSpeed: number
): void {
  if (setMouseSpeed > 20 || setMouseSpeed < 1)
    throw new Error("The mouse speed must be within the range 1-20");

  addon.setMouseSpi(false, false, mousePrecision);
  addon.setMouseSpeedSpi(setMouseSpeed);
}
