import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {sale, latest, price_inc, price_dec, relevence} from "../../shared/json/index"
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

const Context = React.createContext();

const ContextProvider = ({ initialTheme, children }) => {
  const router = useRouter();

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

  // side bar
  const [showSide, setShowSide] = useState(false);
  function sideToggler() {
    setShowSide(!showSide);
  }

  // sort products
  const [filter, setFilter] = useState("");
  function sorter(rawProducts) {

    let sortedProducts = [...rawProducts];
    let f = filter;
    
    if (f === "") {
      f = router.query.sort;
      if (f == undefined) return { message: "not-ok", sortedProducts };
      setFilter(f);
    }

    switch (f) {
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

    let currentUrlParams = new URLSearchParams(router.query);
    currentUrlParams.set("sort", f);
    router.push(router.pathname + "?" + currentUrlParams.toString());

    return { message: "ok", sortedProducts };
  }
  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        showSide,
        sideToggler,
        filter,
        setFilter,
        sorter,
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
