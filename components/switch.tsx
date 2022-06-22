import { ReactNode } from "react";
import { useState } from "react";
interface ISwitchProps {
    onSwitchOn: () => void;
    onSwitchOff: () => void;
    children?: ReactNode;
}

const Switch: React.FC<ISwitchProps> = ({ onSwitchOff, onSwitchOn, children }) => {
    const [toggle, setToggle] = useState(false);
    const toggleClass = "transform translate-x-7";
    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                {/*   Switch Container */}
                <div
                    className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-slate-200 dark:bg-slate-600 rounded-full cursor-pointer"
                    onClick={() => {
                        setToggle(!toggle);
                        toggle === true ? onSwitchOff() : onSwitchOn();
                    }}
                >
                    {/* Switch */}
                    <div
                        className={
                            "bg-primary-main dark:bg-primaryDark-main md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                            (toggle ? null : toggleClass)
                        }
                    >
                        <span className="flex items-center justify-center w-full h-full">
                            {children}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Switch;
