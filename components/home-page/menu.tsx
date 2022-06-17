import Link from "next/link";
import React from "react";
import { IRoute } from "../../pages/index";
import { useRouter } from "next/router";
interface Props {
    routes: IRoute[];
    close: () => void;
}

export const Menu: React.FC<Props> = ({ routes, close }) => {
    const url = useRouter();
    return (
        <div className="flex">
            <div
                className={`bg-white shadow-lg rounded-r-2xl md:rounded-none dark:bg-slate-800 h-screen flex flex-col
                 md:flex-row px-5 py-6 md:px-24 md:h-auto absolute md:relative w-3/4 md:w-full
                 text-primary-400 font-bold text-primary-main  dark:text-primaryDark-main`}
            >
                <div className="text-3xl md:text-5xl ">Logo</div>
                <ul className="flex flex-col md:flex-row justify-center md:items-end mt-8 md:mt-0 md:ml-8">
                    {routes.map((route, index) => (
                        <li
                            key={`route-${index}`}
                            className={`
                            transition-all duration-150 rounded-2xl  my-2 md:mx-6
                          hover:bg-primary-300 hover:text-white
                          ${url.asPath === route.link && "bg-primary-300 text-white"}
                          hover:dark:bg-primaryDark-main hover:dark:text-black
                          `}
                        >
                            <Link href={route.link} key={`route-${index}`}>
                                <a className="block p-2 px-4  w-full text-base md:text-xl ">
                                    {route.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className="md:hidden absolute right-0 w-1/4 h-screen bg-transparent opacity-50 blur-sm"
                onClick={(e) => close()}
            ></div>
        </div>
    );
};

export default Menu;
