import React, { InputHTMLAttributes } from "react";

export const SimpleInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
    className,
    ...restOfProps
}) => {
    return (
        <label className={`rounded-lg w-full ${restOfProps.disabled && "bg-slate-100"}`}>
            <input
                className={`px-3 py-2 outline-none text-base w-full ${className}`}
                {...restOfProps}
            />
        </label>
    );
};

export default SimpleInput;
