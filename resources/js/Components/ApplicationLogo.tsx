import { usePage } from "@inertiajs/react";
import React from "react";

export default function ApplicationLogo({ className }) {
    const { info } = usePage().props;
    return (
        // checked shared data in inertia website
        // HandleInertiarequest middleware
        <img
            src={info && info.company_logo ? info.company_logo : '/images/company_logo.png'}
            className="w-40 h-40 rounded-full"
            alt={" logo"}
        />
    );
}
