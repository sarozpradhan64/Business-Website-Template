import React from "react";

// sidebar active statemanagement
const getInitalCollapse = () => {
    // if (typeof window !== "undefined" && window.sessionStorage) {
    //     const activePrefs = window.sessionStorage.getItem("active");
    //     if (typeof activePrefs === "string") {
    //         return activePrefs;
    //     }
    // }
    return "";
};

export const ActiveContext = React.createContext();

export const ActiveProvider = ({ initialActive, children }) => {
    const [active, setActive] = React.useState(getInitalCollapse);

    const rawSetActive = (active) => {
        // sessionStorage.setItem("active", active); //storing active configuration in local
    };

    if (initialActive) {
        rawSetActive(initialActive);
    }
    React.useEffect(() => {
        rawSetActive(active);
    }, [active]);

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    );
};
