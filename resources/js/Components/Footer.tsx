import React from "react";
import { Link, usePage } from "@inertiajs/react";
import TelephoneIcon from "@/src/icons/TelephoneIcon";
import PhoneIcon from "@/src/icons/PhoneIcon";
import LinkedinIcon from "@/src/icons/LinkedinIcon";
import YoutubeIcon from "@/src/icons/YoutubeIcon";
import Instagram from "@/src/icons/instagram";

export default function Footer() {
    const { info } = usePage().props;
    return (
        <>
            <footer className="relative z-10 bg-primary px-4 pt-20 pb-10 lg:pt-[120px] lg:pb-20">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
                            <div className="mb-10 w-full">
                                <Link className="mb-4 inline-block max-w-[160px]" href="/">
                                    <img
                                        src={
                                            info.company_logo
                                                ? info.company_logo
                                                : "/images/company_logo.png"
                                        }
                                        alt="logo"
                                        className="h-28 rounded-md"
                                    />
                                </Link>
                                <p className="mb-7 text-primary">
                                    {info.company_slogan}
                                </p>

                                {info.telephone && (
                                    <p className=" mb-2 text-primary flex items-center text-sm font-medium">
                                        <span className="text-primary mr-3">
                                            <TelephoneIcon />
                                        </span>
                                        <span>
                                            <a
                                                href={`tel: ${info.telephone}`}
                                            >
                                                {info.telephone}
                                            </a>
                                        </span>
                                    </p>
                                )}

                                {info.phone_number && (
                                    <p className=" mb-2 text-primary flex items-center text-sm font-medium">
                                        <span className="text-primary mr-3">
                                            <TelephoneIcon />
                                        </span>
                                        <span>
                                            <a href={`tel: ${info.phone_number}`}>
                                                {info.phone_number}
                                            </a>
                                        </span>
                                    </p>
                                )}

                                {info.email && (
                                    <p className=" mb-2 text-primary flex items-center text-sm font-medium">
                                        <span className="text-primary mr-3">
                                            <svg
                                                width="19"
                                                height="21"
                                                viewBox="0 0 28 19"
                                                class="fill-current"
                                            >
                                                <path d="M25.3636 0H2.63636C1.18182 0 0 1.16785 0 2.6052V16.3948C0 17.8322 1.18182 19 2.63636 19H25.3636C26.8182 19 28 17.8322 28 16.3948V2.6052C28 1.16785 26.8182 0 25.3636 0ZM25.3636 1.5721C25.5909 1.5721 25.7727 1.61702 25.9545 1.75177L14.6364 8.53428C14.2273 8.75886 13.7727 8.75886 13.3636 8.53428L2.04545 1.75177C2.22727 1.66194 2.40909 1.5721 2.63636 1.5721H25.3636ZM25.3636 17.383H2.63636C2.09091 17.383 1.59091 16.9338 1.59091 16.3499V3.32388L12.5 9.8818C12.9545 10.1513 13.4545 10.2861 13.9545 10.2861C14.4545 10.2861 14.9545 10.1513 15.4091 9.8818L26.3182 3.32388V16.3499C26.4091 16.9338 25.9091 17.383 25.3636 17.383Z" />
                                            </svg>
                                        </span>
                                        <span>
                                            <a href={`mailto: ${info.email}`}>
                                                {info.email}
                                            </a>
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
                            <div className="mb-10 w-full">
                                <h4 className="text-primary mb-9 text-lg font-semibold">
                                    Company
                                </h4>
                                <ul>
                                    {info.company_address && (
                                        <li>
                                            <a className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose">
                                                Address:
                                                {" " + info.company_address}
                                            </a>
                                        </li>
                                    )}

                                    {info.license_num && (
                                        <li>
                                            <a className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose">
                                                liscense No:
                                                {" " + info.license_number}
                                            </a>
                                        </li>
                                    )}

                                    {info.registered_number && (
                                        <li>
                                            <a className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose">
                                                Registered No:
                                                {" " + info.registered_number}
                                            </a>
                                        </li>
                                    )}

                                    {info.established_date && (
                                        <li>
                                            <a className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose">
                                                Established In:
                                                {" " +
                                                    info.established_date}{" "}
                                                A.D
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
                            <div className="mb-10 w-full">
                                <h4 className="text-primary mb-9 text-lg font-semibold">
                                    Quick Links
                                </h4>
                                <ul>
                                    <li>
                                        <Link
                                            href={route("contact")}
                                            className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose"
                                        >
                                            Work With Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={"/#services"}
                                            className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose"
                                        >
                                            Our Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("projects")}
                                            className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose"
                                        >
                                            Our Projects
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href={info.google_map_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-400 hover:text-primary mb-2 inline-block text-primary leading-loose"
                                        >
                                            Google Map
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
                            <div className="mb-10 w-full">
                                <h4 className="text-primary mb-9 text-lg font-semibold">
                                    Follow Us On
                                </h4>
                                <div className="mb-6 flex items-center">
                                    <a
                                        target={"_blank"}
                                        rel="noreferrer"
                                        href={info.facebook_url}
                                        className="text-primary hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-purple-700 sm:mr-4 lg:mr-3 xl:mr-4"
                                    >
                                        <svg
                                            width="8"
                                            height="16"
                                            viewBox="0 0 8 16"
                                            className="fill-current"
                                        >
                                            <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                                        </svg>
                                    </a>

                                    <a
                                        target={"_blank"}
                                        rel="noreferrer"
                                        href={info.linkedin_url}
                                        className="text-primary hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-purple-700 sm:mr-4 lg:mr-3 xl:mr-4"
                                    >
                                        <div className="w-4">
                                            <LinkedinIcon />
                                        </div>
                                    </a>
                                    <a
                                        target={"_blank"}
                                        rel="noreferrer"
                                        href={info.linkedin_url}
                                        className="text-primary hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-purple-700 sm:mr-4 lg:mr-3 xl:mr-4"
                                    >
                                        <div className="w-5">
                                            <Instagram />
                                        </div>
                                    </a>
                                    <a
                                        target={"_blank"}
                                        rel="noreferrer"
                                        href={info.twitter_url}
                                        className="text-primary hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-purple-700 sm:mr-4 lg:mr-3 xl:mr-4"
                                    >
                                        <svg
                                            width="16"
                                            height="12"
                                            viewBox="0 0 16 12"
                                            className="fill-current"
                                        >
                                            <path d="M14.2194 2.06654L15.2 0.939335C15.4839 0.634051 15.5613 0.399217 15.5871 0.2818C14.8129 0.704501 14.0903 0.845401 13.6258 0.845401H13.4452L13.3419 0.751468C12.7226 0.258317 11.9484 0 11.1226 0C9.31613 0 7.89677 1.36204 7.89677 2.93542C7.89677 3.02935 7.89677 3.17025 7.92258 3.26419L8 3.73386L7.45806 3.71037C4.15484 3.61644 1.44516 1.03327 1.00645 0.587084C0.283871 1.76125 0.696774 2.88845 1.13548 3.59296L2.0129 4.90802L0.619355 4.20352C0.645161 5.18982 1.05806 5.96477 1.85806 6.52838L2.55484 6.99804L1.85806 7.25636C2.29677 8.45401 3.27742 8.94716 4 9.13503L4.95484 9.36986L4.05161 9.93346C2.60645 10.8728 0.8 10.8024 0 10.7319C1.62581 11.7652 3.56129 12 4.90323 12C5.90968 12 6.65806 11.9061 6.83871 11.8356C14.0645 10.2857 14.4 4.41487 14.4 3.2407V3.07632L14.5548 2.98239C15.4323 2.23092 15.7935 1.8317 16 1.59687C15.9226 1.62035 15.8194 1.66732 15.7161 1.6908L14.2194 2.06654Z" />
                                        </svg>
                                    </a>
                                    <a
                                        target={"_blank"}
                                        rel="noreferrer"
                                        href={info.youtube_url}
                                        className="text-primary hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-purple-700 sm:mr-4 lg:mr-3 xl:mr-4"
                                    >
                                        <div className="w-4">
                                            <YoutubeIcon />
                                        </div>
                                    </a>
                                </div>
                                <p className="text-primary">
                                    &copy; {new Date().getFullYear()} {info.company_name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="absolute left-0 bottom-0 z-[-1]">
                        <svg
                            width="217"
                            height="229"
                            viewBox="0 0 217 229"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
                                fill="url(#paint0_linear_1179_5)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_1179_5"
                                    x1="76.5"
                                    y1="281"
                                    x2="76.5"
                                    y2="1.22829e-05"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        stop-color="#3056D3"
                                        stop-opacity="0.08"
                                    />
                                    <stop
                                        offset="1"
                                        stop-color="#C4C4C4"
                                        stop-opacity="0"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </div>
            </footer>
        </>
    );
}
