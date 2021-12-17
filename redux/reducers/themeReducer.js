import {TOGGLE_THEME} from "../types";

const themeReducer = (
  isDark= true,
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
