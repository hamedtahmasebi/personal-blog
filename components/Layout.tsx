import React from "react";
import SideBar from "./home-page/side-bar";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex xl:mx-44 w-auto h-full relative">
                <div className="fixed -bottom-1 w-full md:relative md:w-auto md:px-6">
                    <SideBar />
                </div>
                <div className="w-full border-l border-r px-8 md:px-12 lg:px-16 xl:px-24">
                    {children}
                </div>
                <div className="hidden lg:flex lg:w-5/12">Other things</div>
            </div>
        </>
    );
};

export default Layout;
