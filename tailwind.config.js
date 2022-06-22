module.exports = {
    darkMode: "class",
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#f578f5",
                    200: "#ad26ad",
                    300: "#751A75",
                    main: "#641664",
                    500: "33032F",
                },
                primaryDark: {
                    100: "#ffe15e",
                    200: "#fcd83a",
                    300: "#ffb917",
                    main: "#ffad14",
                    500: "#ff9500",
                },
            },
        },
    },
    plugins: [],
};
