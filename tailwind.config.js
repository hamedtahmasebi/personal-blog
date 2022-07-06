module.exports = {
    darkMode: "class",
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#eb34eb",
                    200: "#c92ac9",
                    300: "#992099",
                    main: "#8c1f8c",
                    500: "33032F",
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
