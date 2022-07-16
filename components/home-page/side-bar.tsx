import { useState, useRef } from "react";
import Menu from "./menu";
import { BsX } from "react-icons/bs";
import { RiMenuFill, RiSearch2Line } from "react-icons/ri";
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
    const toggleMenu = (menuElement: HTMLDivElement) => {
        menuElement.classList.toggle("w-3/4");
    };
    return (
        <>
            <div
                className={`md:hidden w-full shadow-lg -top-1 bg-white dark:bg-slate-900
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
                <div className="text-4xl">Nextjs blog</div>

                <RiSearch2Line size={25} />
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
};

export default SideBar;
