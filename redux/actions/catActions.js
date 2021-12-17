import { SET_CATEGORY } from "../types";

export const updateCats = (cats)=> (dispatch) => {
  dispatch({
    type: SET_CATEGORY,
    payload: cats,
  });
};
