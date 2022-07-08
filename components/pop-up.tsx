import React from "react";

type TProps = {
    children: React.ReactNode;
};

export const PopUp: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <>
            <div
                {...rest}
                className={`absolute bg-white dark:bg-slate-700 shadow-lg rounded-md min-w-[130px] z-50 border ${className}`}
            >
                <div className="absolute -top-2 border-l border-t transform translate-x-1/2 rotate-45 bg-white w-4 h-4 rounded-sm"></div>
                <div className="p-3">{children}</div>
            </div>
        </>
    );
};

export default PopUp;
