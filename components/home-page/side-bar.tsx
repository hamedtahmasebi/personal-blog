import { useState, useRef } from "react";
import Menu from "./menu";
import { BsHouse, BsBookmarks, BsSearch, BsPersonCircle } from "react-icons/bs";
import { RiMenuFill } from "react-icons/ri";
export interface IRoute {
    title: string;
    link: string;
}
import * as ROUTES from "../../utilities/routes";

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
export const SideBar = () => {
    const [openMenu, setOpenMenu] = useState<Boolean>(false);
    const menuContainer = useRef(null);
    return (
        <>
            <div className="flex items-center md:flex-col md:h-screen w-full z-50 bg-white border-t py-4 justify-around md:justify-center md:gap-20">
                <button className="p-2 rounded-full">
                    <BsHouse size={25} />
                </button>
                <button className="p-2 rounded-full">
                    <BsBookmarks size={25} />
                </button>
                <button className="p-2 rounded-full">
                    <BsSearch size={25} />
                </button>
                <button className="p-2 rounded-full">
                    <BsPersonCircle size={25} />
                </button>
            </div>
        </>
    );
};

export default SideBar;

const old = () => (
    <>
        <div
            className={`md:hidden w-full border-b sticky z-20 -top-1 bg-white dark:bg-slate-900
                flex items-center justify-between py-4 px-6 text-primary-main dark:text-primaryDark-main`}
        >
            <label className="">
                <input
                    type="checkbox"
                    name="menu-toggle"
                    id=""
                    hidden
                    onChange={(e) => setOpenMenu(!openMenu)}
                />

                <RiMenuFill size={25} />
            </label>
        </div>
        <div
            ref={menuContainer}
            className={`md:hidden fixed z-40 w-full top-0 ease-in-out duration-300 ${
                openMenu ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <Menu routes={routes} close={() => setOpenMenu(false)} />
        </div>
        <div className="hidden md:block">
            <Menu routes={routes} close={() => setOpenMenu(false)} />
        </div>
    </>
);
