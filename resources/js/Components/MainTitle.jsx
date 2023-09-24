import React from "react";

export default function MainTitle({ children, className }) {
    return (
        <div className="">
            {" "}
            <h1
                className={`
                font-bold
                text-3xl
                sm:text-4xl
                md:text-[55px]
                text-primary
                mb-6 maintitle ${className}`}
            >
                {children}
            </h1>
        </div>
    );
}
