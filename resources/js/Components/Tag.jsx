import React from "react";

export default function Tag({children}) {
    return (
        <div
            className='text-sm
    font-medium
    text-white
    py-2
    px-5
    bg-purple-700
    inline-block
    mb-5
  "'
        >
            {children}
        </div>
    );
}
