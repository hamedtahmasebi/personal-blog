import React from "react";
import { BsExclamationCircle, BsX } from "react-icons/bs";
import { TiWarningOutline } from "react-icons/ti";
import { BiCheck } from "react-icons/bi";
interface IProps {
    type: "warning" | "danger" | "success";
    children: React.ReactNode;
    onDismiss: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Alert = ({ type, children, onDismiss }: IProps) => {
    let Icon, bgColorClass, textColorClass;
    switch (type) {
        case "success":
            Icon = BiCheck;
            bgColorClass =
                "bg-emerald-400 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500";
            textColorClass = "text-white dark:bg-emerald-700";
            break;
        case "warning":
            Icon = TiWarningOutline;
            bgColorClass =
                "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500";
            textColorClass = "text-white dark:bg-amber-700";
            break;
        case "danger":
            Icon = BsExclamationCircle;
            bgColorClass = "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500";
            textColorClass = "text-white dark:bg-red-700";
        default:
            break;
    }
    if (Icon)
        return (
            <button
                onClick={onDismiss}
                className={`flex transition duration-75 items-center rounded shadow-md hover:shadow-xl gap-2 w-full h-auto p-3 ${
                    bgColorClass ? bgColorClass : ""
                } ${textColorClass ? textColorClass : ""}`}
            >
                <Icon size={30} />
                <span>{children}</span>
                <div className="bg-white bg-opacity-20 ml-auto">
                    <BsX size={30} />
                </div>
            </button>
        );
    return <div></div>;
};
