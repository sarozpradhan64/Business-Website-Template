import React from "react";

// sidebar collapse statemanagement
const getInitalCollapse = () => {
    if (typeof window !== "undefined" && window.localStorage) {
        const collapsePrefs = window.localStorage.getItem("collapse");
        if (typeof collapsePrefs === "string") {
            return collapsePrefs === "false" ? false : true;
        }
    }
    return false;
};

export const CollapseContext = React.createContext();

export const CollapseProvider = ({ initialCollapse, children }) => {
    const [collapse, setCollapse] = React.useState(getInitalCollapse);

    const rawSetCollapse = (collapse) => {
        localStorage.setItem("collapse", collapse); //storing collapse configuration in local
    };

    if (initialCollapse) {
        rawSetCollapse(initialCollapse);
    }
    React.useEffect(() => {
        rawSetCollapse(collapse);
    }, [collapse]);

    return (
        <CollapseContext.Provider value={{ collapse, setCollapse }}>
            {children}
        </CollapseContext.Provider>
    );
};
