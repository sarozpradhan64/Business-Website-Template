import React from "react";

export default function BackIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={"w-5 h-5" + className}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
        </svg>
    );
}
