import Switch from "./switch";
import { switchDarkMode } from "../utilities/actions";
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { useEffect, useState } from "react";
export const DarkModeSwitch = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(localStorage.getItem("darkMode") === "true" ? true : false);
    }, []);

    return (
        <div>
            <Switch
                initialValue={darkMode}
                onSwitchOff={() => {
                    switchDarkMode("off");
                    setDarkMode(false);
                }}
                onSwitchOn={() => {
                    switchDarkMode("on");
                    setDarkMode(true);
                }}
            >
                {darkMode === true ? <BsFillMoonFill color="white" /> : <BsSun color="white" />}
            </Switch>
        </div>
    );
};
