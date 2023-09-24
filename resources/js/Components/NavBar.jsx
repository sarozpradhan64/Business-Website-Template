import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Facebook from "../src/icons/facebook";
import Instagram from "../src/icons/instagram";
import HomeIcon from "../src/icons/home";
import ProjectIcon from "../src/icons/project";
import ContactIcon from "../src/icons/contact";
import ThemeToggle from "./ThemeToggle";
import PhoneIcon from "@/src/icons/PhoneIcon";
import MailIcon from "@/src/icons/MailIcon";
import ServiceIcon from "@/src/icons/ServiceIcon";
import { ActiveContext } from "@/src/activeContext";
import LinkedinIcon from "@/src/icons/LinkedinIcon";

export default function NavBar({}) {
    // for toggle active link
    const { info } = usePage().props;
    const { active, setActive } = React.useContext(ActiveContext);
    // since about and services are single page nav
    const handleActiveLink = function (linkTitle) {
        linkTitle = linkTitle.toLowerCase();
        switch (linkTitle) {
            case "home":
                setActive("home");
                break;
            case "about":
                setActive("about");
                break;
            case "services":
                setActive("services");
                break;

            case "projects":
                setActive("projects");
                break;

            case "contact":
                setActive("contact");
                break
        }
        if (linkTitle === "home") {
            setActive("home");
        } else if (linkTitle === "about") {
            setActive("about");
        } else if (linkTitle === "services") {
            setActive("services");
        }
    };
    const links = [
        { title: "Home", href: "/", icon: <HomeIcon />, mobLink: true },
        { title: "About", href: "/#about", icon: "", mobLink: false },
        {
            title: "Services",
            href: "/#services",
            icon: <ServiceIcon />,
            mobLink: true,
        },
        {
            title: "Projects",
            href: "/projects",
            icon: <ProjectIcon />,
            mobLink: true,
        },
        {
            title: "Contact",
            href: "/contact",
            icon: <ContactIcon />,
            mobLink: true,
        },
    ];

    const MediaLinks = [
        {
            title: "phone",
            icon: <PhoneIcon />,
            href: "tel:" + info.phone_number,
        },
        {
            title: "email",
            icon: <MailIcon />,
            href: "mailto:" + info.email,
        },
        {
            title: "Facebook",
            icon: <Facebook />,
            href: "",
        },
        {
            title: "Linkedin",
            icon: <LinkedinIcon />,
            href: "",
        },
    ];

    return (
        <>
            {/* // nav for desktop and tab */}
            <div className="w-full  mx-auto flex  fixed bg-primary items-center px-8 z-50 md:flex hidden">
                <div className="">
                    <Link href="/">
                    <img
                        src={
                            info.company_logo
                                ? info.company_logo
                                : "/images/company_logo.png"
                        }
                        className="h-16 mt-2 rounded-md"
                    />
                    </Link>
                </div>
                {/* nav links */}

                <div className="flex grow justify-start  w-fit  rounded-full pl-20 ">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={() => handleActiveLink(link.title)}
                            className={`${
                                active === link.title.toLowerCase()
                                    ? " bg-purple-800 text-white"
                                    : " text-primary "
                            } px-4 py-2 my-1 mx-1 rounded-full  font-bold hover:bg-purple-800 hover:text-white`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                {/* nav links end */}
                <div className="flex rounded-full bg-purple-800 justify-center items-center space-x-2 py-2 px-3">
                    {/* media icons */}
                    <div className="flex space-x-2 ">
                        {MediaLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                className="block w-6 h-6 text-white duration-1 transition ease-in-out delay-150 hover:scale-125 hover:text-purple-200"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>

                    {/* dark/light toggle */}
                    <div className="">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/*  desktop nav end */}

            {/* mobile nav */}
            <div className="py-1 px-2 md:hidden flex  items-center justify-between  bg-purple-700 fixed z-50 overflow-x-auto w-full bottom-0">
                {/* <div>IT Company</div> */}
                <div className="flex space-x-2 justify-center ">
                    {links
                        .filter((link) => link.mobLink == true)
                        .map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="px-1  flex flex-col justify-center items-center text-white h-10"
                            >
                                {link.icon}
                                <b style={{ fontSize: "11px" }}>{link.title}</b>
                            </Link>
                        ))}
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </>
    );
}
