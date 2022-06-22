import React from "react";
import SideBar from "./home-page/side-bar";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SideBar />
            {children}
        </>
    );
};

export default Layout;
