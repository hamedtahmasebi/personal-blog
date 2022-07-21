import { useState, useRef } from "react";

import { BsHouse, BsBookmarks, BsSearch, BsPersonCircle } from "react-icons/bs";
export interface IRoute {
    title: string;
    link: string;
}
import * as ROUTES from "../utilities/routes";
import Link from "next/link";

const routes: IRoute[] = [
    {
        title: "Home",
        link: `/${ROUTES.HOME}`,
    },
    {
        title: "About us",
        link: `/${ROUTES.ABOUT}`,
    },
    {
        title: "Sign Up/Log in",
        link: `/${ROUTES.AUTH}`,
    },
];
export const NavigationBar = () => {
    const [openMenu, setOpenMenu] = useState<Boolean>(false);
    const menuContainer = useRef(null);
    return (
        <>
            <div className="flex items-center md:flex-col md:h-screen w-full z-50 bg-white border-t py-4 justify-around md:justify-center md:gap-20">
                <Link href={"/home"}>
                    <button className="p-2 rounded-full">
                        <BsHouse size={25} />
                    </button>
                </Link>
                <Link href={"/account/bookmarks"}>
                    <button className="p-2 rounded-full">
                        <BsBookmarks size={25} />
                    </button>
                </Link>
                <Link href={"/search"}>
                    <button className="p-2 rounded-full">
                        <BsSearch size={25} />
                    </button>
                </Link>
                <Link href={"/account"}>
                    <button className="p-2 rounded-full">
                        <BsPersonCircle size={25} />
                    </button>
                </Link>
            </div>
        </>
    );
};

export default NavigationBar;
