import { SET_CATEGORY } from "../types";

const catReducer = (
  allCats = [],
  action
) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;
    default:
      return allCats;
  }
};

export default catReducer;
