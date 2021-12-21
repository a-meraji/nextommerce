//ThemeToggle.js
import React from 'react';
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useGlobalContext } from '../utils/Context';

const Toggle = () => {
    const { theme, setTheme } = useGlobalContext();

    return (
        <div className="transition cursor-pointer hover:text-primary rounded-full">
            {theme === 'dark' ? (
                <SunIcon width='22px'
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
            ) : ( 
                    <MoonIcon width='22px'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                )}
        </div>
    );
};

export default Toggle;