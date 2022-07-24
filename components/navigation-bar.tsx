import { BsHouse, BsBookmarks, BsSearch, BsPersonCircle } from "react-icons/bs";
import * as ROUTES from "../utilities/routes";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export interface IRoute {
    title: string;
    link: string;
}

export const NavigationBar = () => {
    const router = useRouter();
    const signOut = async () => {
        await axios
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

    const navbarItems = [
        {
            Icon: BsBookmarks,
            url: `/${ROUTES.BOOKMARKS}}`,
        },
        {
            Icon: BsSearch,
            url: `/${ROUTES.SEARCH}`,
        },
        {
            Icon: BsHouse,
            url: `/${ROUTES.HOME}`,
        },
        {
            Icon: BsPersonCircle,
            url: `/${ROUTES.ACCOUNT}`,
        },
    ];

    return (
        <>
            <div className="flex flex-row-reverse items-center md:flex-col md:h-screen w-full z-50 bg-white border-t md:border-0 py-4 justify-around md:justify-center md:gap-16">
                {navbarItems.map((item, index) => (
                    <Link key={`nav-item-${index}`} href={item.url}>
                        <button
                            className={`p-3 rounded-full  transition-all hover:scale-125 ${
                                router.pathname === item.url
                                    ? "bg-primary-50 transition-all scale-125 text-primary-main"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <item.Icon size={25} />
                        </button>
                    </Link>
                ))}
                <button
                    onClick={() => signOut()}
                    className="p-3 rounded-full bottom-0 text-red-500 hover:bg-red-100 transition-all hover:scale-125"
                >
                    <BiLogOut size={25} />
                </button>
            </div>
        </>
    );
};

export default NavigationBar;
