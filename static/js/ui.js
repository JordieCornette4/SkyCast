/*
SkyCast

UI Module
Version: 1.6.1
*/

function getWeatherContainer() {
    return document.getElementById("weather-container");
}

function getForecastContainer() {
    return document.getElementById("forecast-container");
}

function setResult(html) {
    document.getElementById("result").innerHTML = html;
}

function showLoading(city) {

    getWeatherContainer().innerHTML = `
        <div class="welcome-card">
            <h2>Loading...</h2>
            <p>Getting weather for <strong>${city}</strong>.</p>
        </div>
    `;

}

function showError(message) {

    setResult(`
        <div class="error">
            ${message}
        </div>
    `);

}

function showWelcome() {

    getWeatherContainer().innerHTML = `
        <div class="welcome-card">
            <h2>Welcome!</h2>
            <p>Enter a city above to see the latest weather.</p>
        </div>
    `;

    renderRecentSearches();

}

function renderRecentSearches() {

    const container =
        document.getElementById("favorites-container");

    if (!container) {
        return;
    }

    const searches = JSON.parse(
        localStorage.getItem("skycast-recent-searches") || "[]"
    );

    if (searches.length === 0) {

        container.innerHTML = "";

        return;

    }

    container.innerHTML = `
        <div class="welcome-card">

            <h3>🕒 Recent Searches</h3>

            ${searches.map(city => `
                <button
                    class="favorite-button"
                    onclick="getWeather('${city}')"
                >
                    ${city}
                </button>
            `).join("")}

        </div>
    `;

}
