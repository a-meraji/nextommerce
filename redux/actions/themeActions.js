import { TOGGLE_THEME } from "../types";

export const toggleTheme = (isDark) => (dispatch) => {
  dispatch({
    type: TOGGLE_THEME,
    payload: isDark
      ? { isDark: true }
      : { isDark: false },
  });
};
