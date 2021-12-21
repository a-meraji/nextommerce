import * as types from "../types";

const cartReducer = (
  numb = 0,
  action
) => {
  switch (action.type) {
    case types.INCREMENT:
      return numb + action.payload;
    case types.DECREMENT:
      return numb - action.payload
    default:
      return numb;
  }
};

export default cartReducer;
