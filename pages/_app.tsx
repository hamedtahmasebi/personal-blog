import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { switchDarkMode } from "../utilities/actions";
import { ToastContainer } from "react-toastify";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    function darkModeInitializer() {
        let darkModeStatus = localStorage.getItem("darkMode");
        if (!darkModeStatus || darkModeStatus === "false") return switchDarkMode("off");
        if (darkModeStatus && darkModeStatus === "true") return switchDarkMode("on");
    }
    useEffect(() => {
        darkModeInitializer();
    });

    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    return (
        <>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer className="w-full md:min-w-max" />
        </>
    );
}

export default MyApp;
