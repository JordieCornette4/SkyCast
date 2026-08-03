/*
SkyCast

Forecast Module
Version: 1.3.1
*/

function formatForecastTime(dateText) {

    const date = new Date(dateText);

    return date.toLocaleString([], {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit"
    });

}

async function loadForecast(city) {

    const container = document.getElementById("forecast-container");

    container.innerHTML = `
        <div class="welcome-card">
            <p>Loading forecast...</p>
        </div>
    `;

    try {

        const forecast = await fetchForecast(city);

        if (!Array.isArray(forecast)) {

            container.innerHTML = "";

            return;

        }

        let html = `
            <section class="forecast-section">

                <h2>5-Day Forecast</h2>

                <div class="forecast-grid">
        `;

        forecast.slice(0, 8).forEach(item => {

            html += `
                <div class="forecast-card">

                    <strong>${formatForecastTime(item.time)}</strong>

                    <img
                        src="https://openweathermap.org/img/wn/${item.icon}@2x.png"
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

            </section>
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
