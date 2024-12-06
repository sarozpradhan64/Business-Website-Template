import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./src/themeContext";
import { CollapseProvider } from "./src/collapseContext";
import { ActiveProvider } from "./src/activeContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <CollapseProvider>
                    <ActiveProvider>
                        <App {...props} />
                    </ActiveProvider>
                </CollapseProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
