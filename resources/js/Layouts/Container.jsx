import React from "react";

export default function Container({ children, id }) {
    return (
        <div className="container mx-auto md:pt-32 pt-10 md:px-16 px-4" id={id}>
            {children}
        </div>
    );
}
