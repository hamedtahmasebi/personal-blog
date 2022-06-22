import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = (props) => {
    return (
        <div className="relative">
            <input
                {...props}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg focus:outline-none
                border border-primary-main dark:border-primaryDark-main bg-transparent dark:text-white peer
                 shadow-primary-main dark:shadow-primaryDark-main`}
                placeholder=" "
            />
            <label
                htmlFor={props.id}
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2
                 peer-focus:text-primary-300 peer-focus:dark:text-primaryDark-300 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
            >
                {props.placeholder}
            </label>
        </div>
    );
};

export default FloatingLabelInput;
