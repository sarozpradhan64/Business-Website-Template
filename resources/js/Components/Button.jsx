import React from "react";

export default function Button({
    mode = "main",
    type = "submit",
    className,
    processing,
    children,
    handleClick,
    rounded = false,
}) {
    let modeClass = "";
    switch (mode) {
        case "main":
            modeClass = "bg-purple-700 hover:bg-purple-800 text-white";
            break;
        case "danger":
            modeClass = "bg-red-700 hover:bg-red-800 text-white";
            break;
        case "blue":
            modeClass = "bg-blue-700 hover:bg-blue-800 text-white";
            break;
        case "white":
            modeClass = "bg-gray-300 hover:bg-gray-100 text-primary";
            break;
        case "transparent":
            modeClass = "bg-transparent  text-primary";
            break;
        default:
            modeClass = "bg-purple-700 hover:bg-purple-800 text-white";
    }

    return (
        <button
            onClick={handleClick}
            type={type}
            className={
                `inline-flex items-center px-7 py-3 border border-transparent font-semibold text-md transition ease-in-out duration-150 rounded ${
                    processing && " opacity-25 "
                } ${rounded && " rounded-md "}` +
                className +
                " " +
                modeClass
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
