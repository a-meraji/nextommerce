import {TOGGLE_THEME} from "../types";
import { lightColor, darkColor } from "../values";

const themeReducer = (
  isDark= false,
  action
) => {
  switch (action.type) {
      case TOGGLE_THEME:
          return action.payload
    default:
      return {isDark};
  }
};

export default themeReducer;
