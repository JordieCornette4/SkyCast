/*
SkyCast

Forecast Module
Version: 1.3.0
*/

async function loadForecast(city) {

    const container = document.getElementById("forecast-container");

    container.innerHTML = "<p>Loading forecast...</p>";

    try {

        const forecast = await fetchForecast(city);

        if (forecast.error) {
            container.innerHTML = "";
            return;
        }

        let html = `
            <div class="forecast-section">
                <h2>5-Day Forecast</h2>
                <div class="forecast-grid">
        `;

        forecast.slice(0, 8).forEach(item => {

            html += `
                <div class="forecast-card">

                    <p><strong>${item.time}</strong></p>

                    <img
                        src="https://openweathermap.org/img/wn/${item.icon}.png"
                        alt="${item.description}"
                    >

                    <p>${item.description}</p>

                    <p>🌡 ${item.temperature}°</p>

                    <p>💨 ${item.wind}</p>

                </div>
            `;

        });

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="error">
                Unable to load the forecast.
            </div>
        `;

    }

}
