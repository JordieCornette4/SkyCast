/*
SkyCast

UI Module
Version: 1.4.0
*/

function getWeatherContainer() {
    return document.getElementById("weather-container");
}

function getForecastContainer() {
    return document.getElementById("forecast-container");
}

function showLoading(city) {

    getWeatherContainer().innerHTML = `
        <div class="welcome-card">
            <h2>Loading...</h2>
            <p>Getting weather for <strong>${city}</strong>...</p>
        </div>
    `;

    getForecastContainer().innerHTML = "";

}

function showError(message) {

    getWeatherContainer().innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;

    getForecastContainer().innerHTML = "";

}

function showWelcome() {

    getWeatherContainer().innerHTML = `
        <div class="welcome-card">
            <h2>Welcome!</h2>
            <p>Enter a city above to see the latest weather.</p>
        </div>
    `;

    getForecastContainer().innerHTML = "";

}
