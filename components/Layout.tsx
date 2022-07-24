import React from "react";
import NavigationBar from "./navigation-bar";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex xl:mx-28 2xl:mx-44 w-auto h-full relative pb-36 md:pb-0">
                <div className="relative w-auto md:px-6 z-50">
                    <div className="fixed md:sticky w-full bottom-0  ">
                        <NavigationBar />
                    </div>
                </div>
                <div className="w-full border-l border-r px-4 md:px-12 lg:px-16 xl:px-24">
                    {children}
                </div>
                <div className="hidden lg:flex lg:w-4/12 xl:w-3/12">Other things</div>
            </div>
        </>
    );
};

export default Layout;
