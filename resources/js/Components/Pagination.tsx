import RenderMyHtml from "@/utils/RenderMyHtml";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links  }) {
    return (
        <>
            {links.length > 3 && (
                <div class="flex flex-wrap justify-center">
                    {links.map((link) => (
                        <>
                            {/* {link.url === null && (
                            <div class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                {" "}
                                {link.label}
                            </div>
                        )} */}
                            <Link
                                className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded focus:border-indigo-500 focus:text-indigo-500 ${
                                    link.active && "bg-purple-700 text-white"
                                }`}
                                href={link.url}
                            >
                                {RenderMyHtml(link.label)}
                            </Link>
                        </>
                    ))}
                </div>
            )}
        </>
    );
}
