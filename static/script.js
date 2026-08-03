/*
SkyCast

Main Script
Version: 1.3.0
*/

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("search-button");
    const input = document.getElementById("city");

    button.addEventListener("click", getWeather);

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            getWeather();
        }

    });

});
