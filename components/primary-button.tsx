import React, { PropsWithChildren, ReactPropTypes } from "react";

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { className, children, ...restOfProps } = props;
    return (
        <button
            className={`transition-all px-6 py-2 text-white
            bg-primary-400 dark:bg-primaryDark-main font-bold text-lg 
            hover:bg-primary-500 dark:hover:bg-primaryDark-300
            disabled:bg-opacity-80
            new-shadow
            ${props.className}`}
            {...restOfProps}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
