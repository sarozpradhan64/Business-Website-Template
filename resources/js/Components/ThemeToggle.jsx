import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { ThemeContext } from "@/src/themeContext";
import SunIcon from "@/src/icons/SunIcon";
import MoonIcon from "@/src/icons/MoonIcon";

export default function ThemeToggle() {
    // for toggle active link
    const [enabled, setEnabled] = useState(false);
    const { theme, setTheme } = React.useContext(ThemeContext);

    function isDark() {
        return theme === "dark";
    }

    function toggleTheme(e) {
        setTheme(e.target.checked ? "dark" : "light");
    }
    function handleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <Switch
            checked={isDark()}
            onChange={handleTheme}
            className={`${
                theme === "dark" ? "bg-purple-300" : "bg-gray-200"
            } relative flex items-center h-6 w-11 rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>

            <div
                className={`${
                    theme === "dark" ? "translate-x-6 bg-gray-900" : " translate-x-1 bg-white "
                } inline-block h-4 w-4 transform rounded-full transition text-amber-300`}
            >
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </div>
        </Switch>
    );
}
