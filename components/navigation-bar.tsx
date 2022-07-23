import { useState, useRef } from "react";
import { BsHouse, BsBookmarks, BsSearch, BsPersonCircle } from "react-icons/bs";
import * as ROUTES from "../utilities/routes";
import Link from "next/link";
export interface IRoute {
    title: string;
    link: string;
}

export const NavigationBar = () => {
    return (
        <>
            <div className="flex items-center md:flex-col md:h-screen w-full z-50 bg-white border-t py-4 justify-around md:justify-center md:gap-20">
                <Link href={`/${ROUTES.HOME}`}>
                    <button className="p-2 rounded-full">
                        <BsHouse size={25} />
                    </button>
                </Link>
                <Link href={`/${ROUTES.BOOKMARKS}}`}>
                    <button className="p-2 rounded-full">
                        <BsBookmarks size={25} />
                    </button>
                </Link>
                <Link href={`/${ROUTES.SEARCH}`}>
                    <button className="p-2 rounded-full">
                        <BsSearch size={25} />
                    </button>
                </Link>
                <Link href={`/${ROUTES.ACCOUNT}`}>
                    <button className="p-2 rounded-full">
                        <BsPersonCircle size={25} />
                    </button>
                </Link>
            </div>
        </>
    );
};

export default NavigationBar;
