const DangerButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { className, children, ...restOfProps } = props;
    return (
        <button
            className={`transition-all px-6 py-2 text-white
            bg-red-700 dark:bg-red-500 font-bold text-lg 
            hover:bg-red-800 dark:hover:bg-red-400
            disabled:bg-opacity-80
            ${props.className}`}
            {...restOfProps}
        >
            {children}
        </button>
    );
};

export default DangerButton;
