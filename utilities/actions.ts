export function switchDarkMode(status: "off" | "on") {
    if (status === "off") {
        document.querySelector("body")?.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
    }
    if (status === "on") {
        document.querySelector("body")?.classList.add("dark");
        localStorage.setItem("darkMode", "true");
    }
}
