module.exports = {
    darkMode: "class",
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#cfdffa",
                    100: "#92bbff",
                    200: "#78aaff",
                    300: "#649eff",
                    400: "#3681ff",
                    main: "#1e71fc",
                    500: "#0a64fa",
                },
                primaryDark: {
                    100: "#fff2ba",
                    200: "#ffea91",
                    300: "#ffb917",
                    main: "#ffad14",
                    500: "#ff9500",
                },
            },
        },
    },
    plugins: [],
};
