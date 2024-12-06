const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            backgroundColor: {
                primary: "var(--color-bg-primary)",
                secondary: "var(--color-bg-secondary)",
            },
            textColor: {
                svghome: "var(--color-home-svg)",
                accent: "var(--color-text-accent)",
                primary: "var(--color-text-primary)",
                secondary: "var(--color-text-secondary)",
            },
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
            backdropBlur: {
                xs: "2px",
            },
            transitionProperty: {
                height: "height",
                spacing: "margin, padding",
            },
        },
    },

    plugins: [require("@tailwindcss/forms")],
};
