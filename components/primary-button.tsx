import React, { PropsWithChildren, ReactPropTypes } from "react";

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { className, children, ...restOfProps } = props;
    return (
        <button
            className={`transition-all px-6 py-2 text-white
            bg-primary-main dark:bg-primaryDark-main font-bold text-lg 
            hover:bg-primary-200 dark:hover:bg-primaryDark-300
            ${props.className}`}
            {...restOfProps}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
