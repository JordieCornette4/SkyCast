/*
SkyCast

Forecast Module
Version: 1.4.0
*/

function formatForecastDate(dateText) {

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
            <p>Loading 5-day forecast...</p>
        </div>
    `;

    try {

        const data = await fetchForecast(city);

        if (data.error) {

            container.innerHTML = `
                <div class="error">
                    ${data.error}
                </div>
            `;

            return;

        }

        if (!Array.isArray(data) || data.length === 0) {

            container.innerHTML = `
                <div class="welcome-card">
                    <p>No forecast available.</p>
                </div>
            `;

            return;

        }

        let html = `
            <section class="forecast-section">
                <h2>5-Day Forecast</h2>

                <div class="forecast-grid">
        `;

        data.slice(0, 8).forEach(item => {

            html += `
                <div class="forecast-card">

                    <strong>${formatForecastDate(item.time)}</strong>

                    <img
                        src="https://openweathermap.org/img/wn/${item.icon}@2x.png"
                        alt="${item.description}"
                    >

                    <p>${item.description}</p>

                    <p>🌡 ${item.temperature}°</p>

                    <p>🤗 Feels Like: ${item.feels_like}°</p>

                    <p>💧 ${item.humidity}% Humidity</p>

                    <p>💨 ${item.wind} Wind</p>

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
                Unable to load forecast.
            </div>
        `;

    }

}
