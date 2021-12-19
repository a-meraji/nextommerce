import React,{useState,useEffect,useContext} from 'react';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }

        const userMedia = window.matchMedia('(prefers-color-scheme: light)');
        if (userMedia.matches) {
            return 'light';
        }
    }

   return 'dark' // light theme as the default;
};

const Context = React.createContext();

const ContextProvider = ({ initialTheme, children }) => {
    const [theme, setTheme] = React.useState(getInitialTheme);

    const ToggleTheme = (rawTheme) => {
        const root = window.document.documentElement;
        const isDark = rawTheme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(rawTheme);

        localStorage.setItem('color-theme', rawTheme);
    };

    if (initialTheme) {
        ToggleTheme(initialTheme);
    }

    React.useEffect(() => {
        ToggleTheme(theme);
    }, [theme]);

    return (
        <Context.Provider value={{ theme, setTheme }}>
            {children}
        </Context.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(Context)
  }
  
  export { Context, ContextProvider }