import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { switchDarkMode } from "../utilities/actions";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }: AppProps) {
    function darkModeInitializer() {
        let darkModeStatus = localStorage.getItem("darkMode");
        if (!darkModeStatus || darkModeStatus === "false") return switchDarkMode("off");
        if (darkModeStatus && darkModeStatus === "true") return switchDarkMode("on");
    }
    useEffect(() => {
        darkModeInitializer();
    });
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <ToastContainer position={"bottom-right"} style={{ width: "fit-content" }} />
        </>
    );
}

export default MyApp;
