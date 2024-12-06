import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Head, usePage } from "@inertiajs/react";
import ScrollToTop from "@/Components/ScrollToTop";
import MenuIcon from "@/src/icons/MenuIcon";
import Alert from "@/Components/Alert";
import { CollapseContext, CollapseProvider } from "@/src/collapseContext";
import CollapseToggle from "@/Components/CollapseToggle";

export default function AdminLayout({ title, activeTitle, children }) {
    const { collapse, setCollapse } = React.useContext(CollapseContext);
    const { flash } = usePage().props;
    const [successActive, setSuccessActive] = useState(true);

    const [dangerActive, setDangerActive] = useState(true);

    //  activate sucess/danger alert if the flash message is available
    useEffect(() => {
        if (flash.message) {
            setSuccessActive(true);
        }
        if (flash.danger) {
            setDangerActive(true);
        }

        setTimeout(() => {
            setSuccessActive(false);
            flash.message = null;
        }, 5000);
    });

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    function handleSuccess() {
        setSuccessActive(!successActive);
        flash.message = null; //flash.message = null after the alert is closed.
    }

    function handleDanger() {
        setDangerActive(!dangerActive);
        flash.danger = null; //flash.danger = null after the alert is closed.
    }

    return (
        <>
            <Head>
                <title>{title ? "PITS Admin - " + title : "PITS Admin"}</title>
            </Head>
            <div className="bg-primary text-primary">
                {/* alert  */}
                <div className="pits-alert">
                    {flash.message && successActive && (
                        <Alert
                            type="success"
                            content={flash.message}
                            handleClick={handleSuccess}
                        />
                    )}

                    {flash.danger && successActive && (
                        <Alert
                            type="danger"
                            content={flash.danger}
                            handleClick={handleDanger}
                        />
                    )}
                </div>
                <div className="h-screen  overflow-hidden py-3">
                    {/* fixed sidebar  */}
                    <div className="fixed top-0 bottom-0 my-3 mx-3">
                        <Sidebar activeTitle={activeTitle} />
                    </div>

                    {/* content  */}
                    <div
                        className={`${
                            // stretch full width in mobile view
                            collapse
                                ? " md:ml-28  ml-5"
                                : " ml-64 md:w-auto w-full"
                        } mr-5  duration-200  ease rounded-xl bg-secondary p-5 h-full  overflow-auto`}
                        //
                    >
                        <div className=" mb-5  flex justify-start  items-center space-x-2 ">
                            {/* collapse menu  */}
                            <div className="sm:static fixed bottom-2 right-2">
                                <CollapseToggle />
                            </div>
                            <h1 className="text-3xl font-extrabold">
                                {" "}
                                {title ? title : "Admin Panel"}
                            </h1>
                        </div>
                        {children}
                    </div>
                </div>
                <ScrollToTop />
            </div>
        </>
    );
}
