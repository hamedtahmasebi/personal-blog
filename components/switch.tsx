import { useEffect } from "react";
import { ReactNode } from "react";
import { useState } from "react";
interface ISwitchProps {
    onSwitchOn: () => void;
    onSwitchOff: () => void;
    children?: ReactNode;
    initialValue: false | true;
}

const Switch: React.FC<ISwitchProps> = ({ onSwitchOff, onSwitchOn, children, initialValue }) => {
    const [toggle, setToggle] = useState<boolean>(false);

    useEffect(() => {
        setToggle(initialValue);
    }, [initialValue]);

    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                {/*   Switch Container */}
                <div
                    className="md:w-16 md:h-8 w-16 h-8 flex items-center bg-slate-200 dark:bg-slate-600 rounded-full cursor-pointer"
                    onClick={() => {
                        setToggle(!toggle);
                        toggle === true ? onSwitchOff() : onSwitchOn();
                    }}
                >
                    {/* Switch */}
                    <div
                        className={
                            "bg-primary-main dark:bg-primaryDark-main h-full w-1/2 rounded-full shadow-md transform duration-300 ease-in-out" +
                            (toggle === true ? "transform translate-x-9" : null)
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
