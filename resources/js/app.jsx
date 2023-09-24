import "./bootstrap";
import "../css/app.css";

import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "./src/themeContext";
import { CollapseProvider } from "./src/collapseContext";
import { ActiveProvider } from "./src/activeContext";

// const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    // title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        return render(
            <ThemeProvider>
                <CollapseProvider>
                    <ActiveProvider>
                        <App {...props} />
                    </ActiveProvider>
                </CollapseProvider>
            </ThemeProvider>,
            el
        );
    },
});

// InertiaProgress.init({ color: "rgb(113,68,125)" });
