import { TOGGLE_THEME } from "../types";
import { darkColor, lightColor } from "../values";

export const toggleTheme = (isDark) => (dispatch) => {
  dispatch({
    type: TOGGLE_THEME,
    payload: isDark
      ? { isDark: true }
      : { isDark: false },
  });
};
