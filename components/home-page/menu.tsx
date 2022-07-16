import Link from "next/link";
import { useState } from "react";
import { IRoute } from "./side-bar";
import { useRouter } from "next/router";
import Switch from "../switch";
import { BiSun } from "react-icons/bi";
import { IoMoon } from "react-icons/io5";
import { switchDarkMode } from "../../utilities/actions";
import { useEffect, useLayoutEffect } from "react";
import Search from "../search";
interface Props {
    routes: IRoute[];
    close: () => void;
}

export const Menu: React.FC<Props> = ({ routes, close }) => {
    const url = useRouter();
    const [darkModeSwitchValue, setDarkModeSwitchValue] = useState<boolean>(false);

    useEffect(() => {
        const darkModeStatus = localStorage.getItem("darkMode");
        if (darkModeStatus === "true") {
            setDarkModeSwitchValue(true);
        } else {
            setDarkModeSwitchValue(false);
        }
    }, []);

    return (
        <div className="flex">
            <div
                className={`bg-white shadow-lg dark:bg-slate-800 h-screen flex flex-col
                 md:flex-row px-5 py-6 md:px-12 lg:px-24 md:h-auto w-3/4 md:w-full absolute md:relative 
                 text-primary-400 text-primary-main  dark:text-primaryDark-main font-bold`}
            >
                <h1 className="text-4xl font-bold my-auto md:w-1/6">Nextjs blog</h1>
                <ul className="flex flex-col md:flex-row md:justify-center md:items-center mt-6 md:mt-0 md:ml-8 h-full list-none md:w-full ml-2">
                    {routes.map((route, index) => (
                        <li
                            key={`route-${index}`}
                            className={`
                            rounded-sm  my-2 mx-0 md:mx-3   border-b-transparent border-b
                            hover:border-b-primary-main dark:hover:border-b-primaryDark-main
                          `}
                        >
                            <Link href={route.link} key={`route-${index}`}>
                                <a
                                    className="block py-2 md:p-2 md:px-4  w-full text-base md:text-xl "
                                    onClick={(e) => close()}
                                >
                                    {route.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li className="md:ml-auto md:w-1/5">
                        <Search onSubmit={() => console.log("RUN")} />
                    </li>
                    <li className="flex mt-auto ml-4 md:mt-0">
                        <div className="">
                            <Switch
                                onSwitchOff={() => {
                                    switchDarkMode("off");
                                }}
                                onSwitchOn={() => {
                                    switchDarkMode("on");
                                }}
                                initialValue={darkModeSwitchValue}
                            >
                                <span className="dark:hidden">
                                    <BiSun color="white" />
                                </span>
                                <span className="hidden dark:inline">
                                    <IoMoon color="white" />
                                </span>
                            </Switch>
                        </div>
                    </li>
                </ul>
            </div>
            <div
                className={`md:hidden absolute right-0 w-1/4 h-screen 
                bg-primary-200 dark:bg-black bg-opacity-5 dark:bg-opacity-30 blur-sm`}
                onClick={(e) => close()}
            ></div>
        </div>
    );
};

export default Menu;
