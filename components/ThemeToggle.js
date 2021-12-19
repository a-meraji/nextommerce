//ThemeToggle.js
import React from 'react';
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useGlobalContext } from '../utils/Context';

const Toggle = () => {
    const { theme, setTheme } = useGlobalContext();

    return (
        <div className="transition duration-500 ease-in-out rounded-full p-2">
            {theme === 'dark' ? (
                <SunIcon width='25px'
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="text-black  text-2xl cursor-pointer"
                />
            ) : ( 
                    <MoonIcon width='25px'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="text-black  text-2xl cursor-pointer"
                    />
                )}
        </div>
    );
};

export default Toggle;