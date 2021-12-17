import { INCREMENT, DECREMENT } from "../types";
export const sum = (numb) => (dispatch) => {
  dispatch({
    type: INCREMENT,
    payload: numb,
  });
};

export const min = (numb) => (dispatch) => {
  dispatch({
    type: DECREMENT,
    payload: numb
  })
}