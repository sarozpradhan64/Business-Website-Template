import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { ThemeProvider } from "@/src/themeContext";

export default function Guest({ children }) {
 
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-primary flex flex-col sm:justify-center items-center py-6">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-secondary shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </ThemeProvider>
    );
}
