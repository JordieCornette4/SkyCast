/*
SkyCast

UI Module
Version: 1.3.1
*/

function weatherContainer() {
    return document.getElementById("weather-container");
}

function forecastContainer() {
    return document.getElementById("forecast-container");
}

function showLoading(city) {

    weatherContainer().innerHTML = `
        <div class="welcome-card">
            <h2>Loading...</h2>
            <p>Getting weather for <strong>${city}</strong>...</p>
        </div>
    `;

    forecastContainer().innerHTML = "";

}

function showError(message) {

    weatherContainer().innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;

    forecastContainer().innerHTML = "";

}

function showWelcome() {

    weatherContainer().innerHTML = `
        <div class="welcome-card">
            <h2>Welcome!</h2>
            <p>Enter a city above to see the latest weather.</p>
        </div>
    `;

    forecastContainer().innerHTML = "";

}
