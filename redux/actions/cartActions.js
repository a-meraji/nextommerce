import * as types from "../types";

export const sum = (numb) => (dispatch) => {
  dispatch({
    type: types.INCREMENT,
    payload: numb,
  });
};

export const min = (numb) => (dispatch) => {
  dispatch({
    type: types.DECREMENT,
    payload: numb
  })
}