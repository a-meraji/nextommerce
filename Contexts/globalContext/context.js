import React, { useState, useEffect, useReducer, useContext } from "react";
import { useRouter } from "next/router";
import reducer from "../Reducer/reducer";

import {
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  LOADING,
  DISPLAY_ITEMS,
  TOGGLE_AMOUNT,
  ADD,
} from "../Reducer/types";
import {
  sale,
  latest,
  price_inc,
  price_dec,
  relevence,
} from "../../shared/json/index";

// get prefered theme saved on the browser and if exist then set the theme base on that
const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: light)");
    if (userMedia.matches) {
      return "light";
    }
  }

  return "dark"; // light theme as the default;
};

// initial reducer values 
const reducernitialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

/* ********  CONTEXT ************ */
const Context = React.createContext();

const ContextProvider = ({ initialTheme, children }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, reducernitialState);
  // all functionallities to work with reducers with diferent dispatches
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const remove = (name) => {
    dispatch({ type: REMOVE, payload: index });
  };
  const cartChange = (name, type) => {
    dispatch({ type: TOGGLE_AMOUNT, payload: { index, type } });
  };
  const displayCart = () => {
    dispatch({ type: DISPLAY_ITEMS });
  };
  const addItem = (item) => {
    dispatch({ type:ADD, payload: {item} })
}  
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
    // check browser history
  }, [state.cart])


  // set the theme from window storage or preferences
  //then set root classlist (diffrent classes on root have diffrent values for a colorName)
  // and also whenever theme changed then set root classList and window storage again.
  const [theme, setTheme] = React.useState(getInitialTheme);

  const ToggleTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);
  };

  if (initialTheme) {
    ToggleTheme(initialTheme);
  }

  React.useEffect(() => {
    ToggleTheme(theme);
  }, [theme]);

  // side bar display condition
  const [showSide, setShowSide] = useState(false);
  function sideToggler() {
    setShowSide(!showSide);
  }

  // sort products for view base on the choosen filter
  const [sort, setSort] = useState("relevence");
  function sorter(rawProducts) {
    let sortedProducts = [...rawProducts];

    switch (sort) {
      case sale:
        sortedProducts = sortedProducts.filter((item) => item.sale === true);
        break;
      case latest:
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case price_inc:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case price_dec:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        console.log("default");
        break;
    }

    return sortedProducts;
  }


  return (
    <Context.Provider
      value={{
        ...state,
        clearCart,
        remove,
        cartChange,
        displayCart,
        addItem,
        theme,
        setTheme,
        showSide,
        sideToggler,
        sorter,
        sort,
        setSort,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export { Context, ContextProvider };
