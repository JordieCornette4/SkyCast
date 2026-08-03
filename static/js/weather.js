/*
SkyCast

Weather Module
Version: 1.5.0
*/

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (!city) {
        showError("Please enter a city.");
        return;
    }

    showLoading(city);

    try {

        const data = await fetchWeather(city);

        if (data.error) {
            showError(data.error);
            return;
        }

        const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

        const sunset = new Date(data.sunset * 1000).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

        document.getElementById("weather-container").innerHTML = `
            <div class="weather-card">

                <h2>${data.city}, ${data.country}</h2>

                <img
                    src="https://openweathermap.org/img/wn/${data.icon}@2x.png"
                    alt="${data.description}"
                >

                <h3>${data.description}</h3>

                <p>🌡 Temperature: ${data.temperature}°</p>
                <p>🤗 Feels Like: ${data.feels_like}°</p>
                <p>💧 Humidity: ${data.humidity}%</p>
                <p>💨 Wind: ${data.wind}</p>
                <p>🌡 Pressure: ${data.pressure} hPa</p>
                <p>☁ Cloud Cover: ${data.clouds}%</p>
                <p>👀 Visibility: ${data.visibility} km</p>
                <p>🌅 Sunrise: ${sunrise}</p>
                <p>🌇 Sunset: ${sunset}</p>

                <button
                    class="favorite-button"
                    onclick="addFavorite('${data.city}')"
                >
                    ⭐ Save to Favorites
                </button>

            </div>
        `;

        await loadForecast(city);

    } catch (error) {

        console.error(error);

        showError("Unable to load weather.");

    }

}
