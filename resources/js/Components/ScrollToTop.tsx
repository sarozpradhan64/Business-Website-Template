import React, { useState } from "react";
export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    // displays button after scrolled down
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };
    window.addEventListener("scroll", toggleVisible);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div
            onClick={handleScrollToTop}
            className={`fixed right-8 bottom-12 w-12 text-purple-700 cursor-pointer select-none z-50 ${
                visible ? "visible" : "hidden"
            } `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 2C6.485 2 2 6.486 2 12s4.485 10 10 10c5.514 0 10-4.486 10-10S17.514 2 12 2zM7 14l5-6 5 6H7z"></path>
            </svg>
        </div>
    );
}
