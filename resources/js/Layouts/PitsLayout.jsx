import Alert from "@/Components/Alert";
import Footer from "@/Components/Footer";
import ScrollToTop from "@/Components/ScrollToTop";
import { ThemeProvider } from "@/src/themeContext";
import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import NavBar from "../Components/NavBar";

export default function PitsLayout({ children, isHomePage = false }) {
    const { flash } = usePage().props;
    return (
        <>
            <ThemeProvider>
                <div className="bg-primary overflow-x-hidden">
                    {/* alert  */}
                    <div className="pits-alert z-50  " style={{ top: "70px" }}>
                        {flash.message && (
                            <Alert type="success" content={flash.message} />
                        )}
                    </div>
                    {/* <div className={`${isHomePage &&  'fixed top-0 w-full '}`}> */}
                    <NavBar  isHome={isHomePage}/>
                    {/* </div> */}
                    <div
                        className={`${
                            !isHomePage && "container text-primary mx-auto p-3"
                        }`}
                    >
                        {children}
                    </div>
                    <ScrollToTop />
                    <Footer />
                </div>
            </ThemeProvider>
        </>
    );
}
