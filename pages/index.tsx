import type { NextPage } from "next";
import { Intro } from "../components/home-page/intro";
import { useRef, useState } from "react";

const Home: NextPage = () => {
    return (
        <div className="w-full h-full relative">
            <div className="flex justify-center mt-3">
                <Intro />
            </div>
        </div>
    );
};

export default Home;
