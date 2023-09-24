import { CollapseContext } from "@/src/collapseContext";
import MenuIcon from "@/src/icons/MenuIcon";
import React from "react";

export default function CollapseToggle() {
    const { collapse, setCollapse } = React.useContext(CollapseContext);

    const toggleCollapse = () => setCollapse(!collapse);
    return (
        <div
            className=" w-9 mb-2 drop-shadow-2xl cursor-pointer rounded-full bg-primary text-primary p-2"
            onClick={toggleCollapse}
        >
            <MenuIcon />
        </div>
    );
}
