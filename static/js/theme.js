/*
SkyCast

Theme Module
Version: 1.0.0
*/

const THEME_KEY = "skycast-theme";

function applyTheme(theme) {

    document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
    );

    const button = document.getElementById("theme-toggle");

    if (button) {

        button.textContent =
            theme === "dark"
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

    }

}

function loadTheme() {

    const theme =
        localStorage.getItem(THEME_KEY) || "light";

    applyTheme(theme);

}

function toggleTheme() {

    const current =
        document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

    const next =
        current === "dark"
            ? "light"
            : "dark";

    localStorage.setItem(THEME_KEY, next);

    applyTheme(next);

}

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    const button = document.getElementById("theme-toggle");

    if (button) {

        button.addEventListener(
            "click",
            toggleTheme
        );

    }

});
