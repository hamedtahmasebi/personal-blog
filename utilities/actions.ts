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

export function validateEmail(email: string) {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
