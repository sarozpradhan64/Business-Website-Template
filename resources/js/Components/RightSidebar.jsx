import SettingIcon from "@/src/icons/SettingIcon";
import React from "react";

export default function RightSidebar() {
    return (
        <aside
            className="h-64 bg-secondary w-16 rounded-xl overflow-auto flex justify-center py-4"
            aria-label="sidebar"
        >
            <div className="h-9 w-9 cursor-pointer" title="Settings">
                <SettingIcon />
            </div>
        </aside>
    );
}
