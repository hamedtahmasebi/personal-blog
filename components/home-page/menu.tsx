import Link from "next/link";
import { useState } from "react";
import { IRoute } from "./side-bar";
import { useRouter } from "next/router";
import Switch from "../switch";
import { BiSun } from "react-icons/bi";
import { IoMoon } from "react-icons/io5";
import { switchDarkMode } from "../../utilities/actions";
import { useEffect, useLayoutEffect } from "react";
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
                className={`bg-white shadow-lg rounded-r-2xl md:rounded-none dark:bg-slate-800 h-screen flex flex-col
                 md:flex-row px-5 py-6 md:px-24 md:h-auto absolute md:relative w-3/4 md:w-full
                 text-primary-400 font-bold text-primary-main  dark:text-primaryDark-main`}
            >
                <div className="text-3xl md:text-5xl ">Logo</div>

                <ul className="flex flex-col md:flex-row md:justify-center md:items-center mt-4 md:mt-0 md:ml-8 h-full">
                    {routes.map((route, index) => (
                        <li
                            key={`route-${index}`}
                            className={`
                            transition-all duration-150 rounded-2xl  my-2 md:mx-6
                            hover:bg-primary-300 hover:text-white
                          ${
                              url.asPath === route.link &&
                              "bg-primary-300 dark:bg-primaryDark-300 text-white"
                          }
                          hover:dark:bg-primaryDark-main hover:dark:text-black
                          `}
                        >
                            <Link href={route.link} key={`route-${index}`}>
                                <a
                                    className="block p-2 px-4  w-full text-base md:text-xl "
                                    onClick={(e) => close()}
                                >
                                    {route.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li className="flex mt-auto md:mt-0">
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
