import type { NextPage } from "next";
import { Intro } from "../components/home-page/intro";
import { useRef, useState } from "react";
import { switchDarkMode } from "../utilities/actions";
import { useEffect } from "react";

const Home: NextPage = () => {
    function darkModeInitializer() {
        let darkModeStatus = localStorage.getItem("darkMode");
        console.log(darkModeStatus);
        if (!darkModeStatus || darkModeStatus === "false") return switchDarkMode("off");
        if (darkModeStatus && darkModeStatus === "true") return switchDarkMode("on");
    }
    useEffect(() => {
        darkModeInitializer();
    });

    return (
        <div className="w-full h-full relative">
            <div className="flex justify-center mt-3">
                <Intro />
            </div>
        </div>
    );
};

export default Home;
