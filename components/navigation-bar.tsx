import { useState, useRef } from "react";
import { BsHouse, BsBookmarks, BsSearch, BsPersonCircle } from "react-icons/bs";
import * as ROUTES from "../utilities/routes";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
export interface IRoute {
    title: string;
    link: string;
}

export const NavigationBar = () => {
    const signout = () => {
        axios
            .get("http://localhost:3000/api/signout")
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Signed out successfully");
                }
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    toast.error(err.message);
                } else {
                    toast.error("Something went wrong");
                    console.log(err);
                }
            });
        window.location.reload();
    };

    return (
        <>
            <div className="flex flex-row-reverse items-center md:flex-col md:h-screen w-full z-50 bg-white border-t md:border-0 py-4 justify-around md:justify-center md:gap-16">
                <Link href={`/${ROUTES.BOOKMARKS}}`}>
                    <button className="p-3 rounded-full hover:bg-gray-100 transition-all hover:scale-125">
                        <BsBookmarks size={25} />
                    </button>
                </Link>
                <Link href={`/${ROUTES.SEARCH}`}>
                    <button className="p-3 rounded-full hover:bg-gray-100 transition-all hover:scale-125">
                        <BsSearch size={25} />
                    </button>
                </Link>
                <Link href={`/${ROUTES.HOME}`}>
                    <button className="p-3 rounded-full hover:bg-gray-100 transition-all hover:scale-125">
                        <BsHouse size={25} />
                    </button>
                </Link>
                <Link href={`/${ROUTES.ACCOUNT}`}>
                    <button className="p-3 rounded-full hover:bg-gray-100 transition-all hover:scale-125">
                        <BsPersonCircle size={25} />
                    </button>
                </Link>
                <button
                    onClick={() => signout()}
                    className="p-3 rounded-full bottom-0 text-red-500 hover:bg-red-100 transition-all hover:scale-125"
                >
                    <BiLogOut size={25} />
                </button>
            </div>
        </>
    );
};

export default NavigationBar;
