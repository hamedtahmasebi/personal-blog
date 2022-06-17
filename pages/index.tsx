import type { NextPage } from "next";
import Menu from "../components/home-page/menu";
import { useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { RiMenuFill, RiSearch2Line } from "react-icons/ri";
import { Intro } from "../components/home-page/intro";
import * as ROUTES from "../utilities/routes";
export interface IRoute {
    title: string;
    link: string;
}

const Home: NextPage = () => {
    const [openMenu, setOpenMenu] = useState<Boolean>(false);
    const menuContainer = useRef(null);
    const routes: IRoute[] = [
        {
            title: "Home",
            link: `/${ROUTES.HOME}`,
        },
        {
            title: "About us",
            link: `/#${ROUTES.ABOUT}`,
        },
        {
            title: "Sign Up/Log in",
            link: `/#${ROUTES.REGISTER}`,
        },
    ];
    const toggleMenu = (menuElement: HTMLDivElement) => {
        menuElement.classList.toggle("w-3/4");
    };

    return (
        <div className="w-full h-full relative">
            <div
                className={`md:hidden w-full shadow-lg -top-1 bg-white dark:bg-slate-900
                a flex items-center justify-between py-4 px-6 text-primary-main dark:text-primaryDark-main`}
            >
                <label className="">
                    <input
                        type="checkbox"
                        name="menu-toggle"
                        id=""
                        hidden
                        onChange={(e) => setOpenMenu(!openMenu)}
                    />
                    <span className="text-[2rem]">
                        <RiMenuFill />
                    </span>
                </label>
                <div className="text-4xl">Logo</div>
                <div className="text-[2rem]">
                    <RiSearch2Line />
                </div>
            </div>

            <div
                ref={menuContainer}
                className={`md:hidden fixed w-full top-0 ease-in-out duration-300 ${
                    openMenu ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={(e) => toggleMenu(e.currentTarget)}
            >
                <Menu routes={routes} close={() => setOpenMenu(false)} />
            </div>
            <div className="hidden md:block">
                <Menu routes={routes} close={() => setOpenMenu(false)} />
            </div>
            <div className="flex justify-center mt-3">
                <Intro />
            </div>
        </div>
    );
};

export default Home;
