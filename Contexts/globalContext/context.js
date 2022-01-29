import React, { useState, useEffect, useReducer, useContext } from "react";
import reducer from "../Reducer/reducer";

// dispatch types for reducer
import {
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  DISPLAY_ITEMS,
  TOGGLE_AMOUNT,
  ADD,
  CART_CHANGE,
} from "../Reducer/types";

// a json containes names and functions for sorting an array of products exp:sort by price
import { sortView } from "../../shared/json";

// an OBJ that have all word in English And Persian
import { LangStrings } from "../values/LangStrings";
import { defaultLang, langs } from "../values/LangValues";

// if local storage or browser preferences has value for the theme
//then get and set the theme based on that
const getInitialTheme = () => {
  // check for theme on localstorage and return if there was a saved value
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    // check for "prefers-color-scheme" on browser preferences and return
    //  if it matches with dark
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light"; // if none of above then light theme as the default;
};

// initial shopping cart reducer states
const reducernitialState = {
  cart: [],
  total: 0,
  amount: 0,
};

/* ********  CONTEXT ************ */
const Context = React.createContext();

const ContextProvider = ({ initialTheme, children }) => {
  // bilingual States
  const [lang, setLang] = useState(defaultLang);
  //change language and font
  const langChanger = (lng) => {
    const root = window.document.documentElement;
    if (lng === langs["fa"]) {
      setLang(lng);
      root.classList.remove("font-en");
      root.classList.add("font-fa");
      localStorage.setItem("language", langs["fa"]);
    }
    else{
      setLang(langs['en']);
      root.classList.remove("font-fa");
      root.classList.add("font-en");
      localStorage.setItem("language", langs["en"]);
    }
  };
  // translator
  const translate = (word) => {
    let key = word.toLowerCase();
    key = key.replace(/-/g, "_");
    if (!LangStrings[lang][key]) {
      console.warn(`No string '${key}' for locale '${lang}'`);
    }

    return LangStrings[lang][key] || LangStrings[defaultLang][key] || "";
  };
  //set lang from localstorage or browser preferences
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (typeof savedLang === "string") {
      langChanger(savedLang)
    } else {
      const prefLang = navigator.language;
      if (prefLang==="fa") {
        langChanger(langs["fa"]);
      } else {
        langChanger(langs["en"]);
      }
    }
  }, []);

  //shopping cart reducer
  const [state, dispatch] = useReducer(reducer, reducernitialState);
  // all functionallities to work with reducers with diferent types of dispatch
  //they exports as global
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const remove = (index) => {
    dispatch({ type: REMOVE, payload: index });
  };
  const cartChange = (index, type) => {
    dispatch({ type: TOGGLE_AMOUNT, payload: { index, type } });
  };
  const displayCart = () => {
    dispatch({ type: DISPLAY_ITEMS });
  };
  const addItem = (item) => {
    dispatch({ type: ADD, payload: { item } });
  };
  const getTotal = () => {
    dispatch({ type: GET_TOTALS });
  };

  // In case user refresh browser or open in new tab
  //  get the sopping cart from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (typeof storedCart === "string") {
        const cartArr = JSON.parse(storedCart);
        dispatch({ type: CART_CHANGE, payload: cartArr });
        //add local storage eventlistener for syncing cart and color theme in all tabs
        window.addEventListener("storage", onStorageUpdate);
        return () => {
          window.removeEventListener("storage", onStorageUpdate);
        };
      }
    }
  }, []);

  // update checkout bill whenever cart change
  useEffect(() => {
    if (typeof window !== "undefined") {
      getTotal();
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  // set the color theme state with getInitailTheme function
  const [theme, setTheme] = React.useState(getInitialTheme);
  // Set root classlist (.light or .dark) and "color-theme" on local storage
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
  // Whenever theme changed then set root classList and localStorage again.
  useEffect(() => {
    ToggleTheme(theme);
  }, [theme]);

  // side bar display condition
  const [showSide, setShowSide] = useState(false);
  function sideToggler() {
    setShowSide(!showSide);
  }
  // cart display condition
  const [showCart, setShowCart] = useState(false);
  function cartToggler() {
    setShowCart(!showCart);
  }

  const [sort, setSort] = useState("relevence");
  // sort view the given products array base on the "sort" state exp:sort by price
  // then return the sorted array
  function sorter(rawProducts) {
    let sortedProducts = [...rawProducts];

    sortView.forEach((item) => {
      if (item.sort === sort) {
        const arrSorter = item.arrSorter;
        sortedProducts = arrSorter(sortedProducts);
      }
    });

    return sortedProducts;
  }

  //update shopping cart, language and color theme in all tabs
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "cart") {
      const cartArr = JSON.parse(newValue);
      dispatch({ type: CART_CHANGE, payload: cartArr });
    }
    if (key === "language") {
      langChanger(newValue);
    }
    if (key === "color-theme") {
      setTheme(newValue);
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        lang,
        langChanger,
        translate,
        clearCart,
        remove,
        cartChange,
        displayCart,
        addItem,
        theme,
        setTheme,
        showSide,
        sideToggler,
        showCart,
        cartToggler,
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
