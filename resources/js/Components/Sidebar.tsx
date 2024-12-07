import { CollapseContext } from "@/src/collapseContext";
import ClientIcon from "@/src/icons/ClientIcon";
import DashboardIcon from "@/src/icons/DashboardIcon";

import HomeIcon from "@/src/icons/home";
import InfoIcon from "@/src/icons/InfoIcon";
import LogoutIcon from "@/src/icons/LogoutIcon";
import MessageIcon from "@/src/icons/MessageIcon";
import ProjectIcon from "@/src/icons/project";
import RotateIcon from "@/src/icons/RotateIcon";
import ServiceIcon from "@/src/icons/ServiceIcon";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import CollapseToggle from "./CollapseToggle";

export default function Sidebar({ activeTitle = "" }) {
    const { collapse, setCollapse } = React.useContext(CollapseContext);
    const { info } = usePage().props;

    const sidebarLinks = [
        // {
        //     icon: <DashboardIcon />,
        //     title: "Dashboard",
        //     hrefRoute: "admin.index",
        // },
        {
            icon: <InfoIcon />,
            title: "Company Info",
            hrefRoute: "admin.companyInfo",
        },
        {
            icon: <ServiceIcon />,
            title: "Services",
            hrefRoute: "admin.service",
        },
        {
            icon: <ProjectIcon />,
            title: "Projects",
            hrefRoute: "admin.project",
        },
        {
            icon: <ClientIcon />,
            title: "Clients",
            hrefRoute: "admin.client",
        },
        {
            icon: <MessageIcon />,
            title: "Messages",
            hrefRoute: "admin.message",
        },

        {
            icon: <RotateIcon />,
            title: "Change Password",
            hrefRoute: "password.change",
        },
        {
            icon: <HomeIcon />,
            title: "Open Site",
            hrefRoute: "home",
        },
    ];
    return (
        <aside
            className={`${
                // takes w-20(5rem width) and display: block above md else display:none
                collapse ? " md:w-20 md:block hidden " : " w-56 "
            } h-full bg-secondary duration-150 ease  border border-purple-700 rounded-xl`}
            aria-label="Sidebar"
        >
            <div className="overflow-y-auto sidebar py-4 px-3 rounded-xl bg-secondary">
                {/* collapse menu  */}
                <div className="sm:static fixed bottom-2 right-2 flex justify-end">
                    <CollapseToggle />
                </div>
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center mb-5"
                >
                    <img
                        src={
                            info !== null && info.company_logo
                                ? info.company_logo
                                : "/images/company_logo.png"
                        }
                        className="h-8 w-8 rounded-full object-cover"
                        alt=" logo"
                    />
                    <div
                        className={`self-center text-xl font-semibold whitespace-nowrap ml-2 ${
                            collapse ? "hidden" : "inline-block "
                        }`}
                    >
                        {info !== null && info.company_name_shortform
                            ? info.company_name_shortform.toUpperCase() +
                              " Admin"
                            : "Admin Panel"}
                    </div>
                </Link>
                <ul className="space-y-2">
                    {sidebarLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={route(link.hrefRoute)}
                                // active background
                                className={`${
                                    activeTitle.toLowerCase() ===
                                    link.title.toLowerCase()
                                        ? "bg-purple-800 text-white"
                                        : "text-primary"
                                } ${
                                    collapse ? " px-1 " : " px-3 "
                                }flex justify-center items-center  py-3 my-3 transition-all duration-300 ease rounded-lg hover:text-white  hover:bg-purple-700`}
                            >
                                <div className="h-6 w-6">{link.icon}</div>

                                <span
                                    className={`flex-1 ml-3  ${
                                        collapse ? "hidden" : "inline-block "
                                    }`}
                                >
                                    {link.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            method="post"
                            href={route("logout")}
                            className={`${
                                collapse ? "px-1 " : " px-3 "
                            } flex justify-center items-center w-full py-3 my-3 transition-all duration-300 text-primary rounded-lg hover:text-white  hover:bg-purple-700 `}
                        >
                            <div className="h-6 w-6">
                                <LogoutIcon />
                            </div>
                            <span
                                className={`flex-1 ml-3  ${
                                    collapse ? "hidden" : "inline-block "
                                }`}
                            >
                                Log out
                            </span>
                        </Link>
                    </li>
                    <li className={collapse ? "px-1 " : " px-2 "}>
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </aside>
    );
}
