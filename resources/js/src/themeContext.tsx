// https://sushilburagute.github.io/blog/dark-mode-react-tailwind/

import React from "react";

const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
        const storedPrefs = window.localStorage.getItem("color-theme");
        if (typeof storedPrefs === "string") {
            return storedPrefs;
        }

        const userMedia = window.matchMedia("(prefers-color-shecme:dark)");
        if (userMedia.matches) {
            return "dark";
        }
    }
    return "light";
};

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
    const [theme, setTheme] = React.useState(getInitialTheme);

    const rawSetTheme = (theme) => {
        const root = window.document.documentElement;
        const isDark = theme === "dark";

        root.classList.remove(isDark ? "light" : "dark");
        root.classList.add(theme);

        localStorage.setItem("color-theme", theme);
    };
    if (initialTheme) {
        rawSetTheme(initialTheme);
    }

    React.useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
