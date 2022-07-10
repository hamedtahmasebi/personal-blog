import React from "react";
import { BsX } from "react-icons/bs";
type TProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export const Modal: React.FC<TProps> = ({ children, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-300 dark:bg-slate-800 dark:bg-opacity-80 bg-opacity-50 z-50 transition-all duration-150">
            <div className="fixed h-screen w-screen z-30" onClick={() => onClose()}></div>
            <div className="relative top-1/4 mx-4 md:mx-auto md:w-1/2 h-auto lg:w-1/3 bg-white dark:bg-slate-800 shadow-2xl rounded-xl z-50">
                <div className="flex flex-col">
                    <div className="flex">
                        <button
                            onClick={() => onClose()}
                            className="bg-red-500 hover:bg-red-400 transition-all text-white rounded-tr-xl ml-auto"
                        >
                            <BsX size={40} />
                        </button>
                    </div>
                    <div className="px-8 pt-2 pb-6">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
