// base on isDark return proper classname to toggle theme
import { lightColor, darkColor } from "../redux/values";
export function mainToggler(isDark, light = lightColor, dark = darkColor) {
  return isDark
    ? { color: light, backgroundColor: dark }
    : { color: dark, backgroundColor: light };
}
export function navToggler(isDark, light = lightColor, dark = darkColor) {
  return isDark
    ? { color: light, backgroundColor: "transparent" }
    : { color: dark, backgroundColor: "transparent" };
}
export function backToggler(isDark) {
  return isDark ? darkColor : lightColor;
}
