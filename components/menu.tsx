import Link from "next/link";
import React from "react";

interface IRoute {
    title: string;
    link: string;
}

interface Props {
    routes: IRoute[];
    close: () => void;
}

export const Menu: React.FC<Props> = ({ routes, close }) => {
    return (
        <div className="flex">
            <div
                className={`bg-white shadow-2xl rounded-r-2xl md:rounded-none dark:bg-slate-800 h-screen flex flex-col
                 md:flex-row px-5 py-6 md:px-24 md:h-auto absolute md:relative w-3/4 md:w-full
                 text-primary-400 font-bold text-primary-main  dark:text-primaryDark-main`}
            >
                <div className="text-3xl md:text-5xl ">Logo</div>
                <ul className="flex flex-col md:flex-row justify-center md:items-end mt-8 md:mt-0 md:ml-8">
                    {routes.map((route, index) => (
                        <li
                            key={`route-${index}`}
                            className={`text-base md:text-xl p-2 transition-all duration-150 rounded-2xl  my-2 md:mx-6
                             active:bg-sky-100 hover:bg-primary-300 hover:text-white
                              hover:dark:bg-primaryDark-main hover:dark:text-black`}
                        >
                            <Link key={`route-${index}`} href={route.link}>
                                Something
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
