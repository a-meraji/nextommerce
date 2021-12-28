import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SALE, LATEST, PRICE_INC, PRICE_DEC } from "../redux/types";
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
    let f = filter
    if (filter === "") {
       f = router.query.sort;
      if (f === "undefined") return {message:"not-ok"};
      setFilter(f);
    }

    let tempArr = [...rawProducts];
    switch (f) {
      case SALE:
        tempArr = tempArr.filter((item) => item.sale === true);
        break;
      case LATEST:
        tempArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case PRICE_INC:
        tempArr.sort((a, b) => a.price - b.price);
        break;
      case PRICE_DEC:
        tempArr.sort((a, b) => b.price - a.price);
        break;
      default:
        console.log("default");
        break;
    }

    let currentUrlParams = new URLSearchParams(router.query);
    currentUrlParams.set("sort", filter);
    router.push(router.pathname + "?" + currentUrlParams.toString());

    return {message:'ok',tempArr};
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
