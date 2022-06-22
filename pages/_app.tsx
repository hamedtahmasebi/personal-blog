import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { switchDarkMode } from "../utilities/actions";
function MyApp({ Component, pageProps }: AppProps) {
    function darkModeInitializer() {
        let darkModeStatus = localStorage.getItem("darkMode");
        console.log(darkModeStatus);
        if (!darkModeStatus || darkModeStatus === "false") return switchDarkMode("off");
        if (darkModeStatus && darkModeStatus === "true") return switchDarkMode("on");
    }
    useEffect(() => {
        darkModeInitializer();
    });
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
