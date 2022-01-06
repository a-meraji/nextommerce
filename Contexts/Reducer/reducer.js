import {
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  LOADING,
  DISPLAY_ITEMS,
  TOGGLE_AMOUNT,
  INCREASE,
  DECREASE,
  ADD,
} from "./types";

const reducer = (state, action) => {
  console.log(action.type);
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem, i) => i !== action.payload),
    };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === TOGGLE_AMOUNT) {
    let tempCart = state.cart
      .map((cartItem, i) => {
        if (i === action.payload.index) {
          if (action.payload.type === INCREASE) {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === DECREASE) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === ADD) {
    let tempC =[]
    let newItem = action.payload.item
    if(state.cart.length !== undefined){
        tempC = state.cart.map((item)=>item)
    }
    tempC.push(newItem)
    return { ...state, cart: tempC }   
  }
  
  throw new Error("no matching action type");
};

export default reducer;
