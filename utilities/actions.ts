export function switchDarkMode(status: "off" | "on") {
    if (status === "off") {
        document.querySelector("body")?.classList.remove("dark");
    }
    if (status === "on") {
        document.querySelector("body")?.classList.add("dark");
    }
}
