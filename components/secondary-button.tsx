import React from "react";

const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { className, children, ...restOfProps } = props;
    return (
        <button
            className={`transition-all px-6 py-2 text-gray-800
            bg-slate-200 hover:bg-slate-300 font-bold text-lg 
             dark:hover:bg-slate-300
            disabled:bg-opacity-80
            new-shadow
            ${props.className}`}
            {...restOfProps}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
