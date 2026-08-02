async function getWeather() {
    const cityInput = document.getElementById("city");
    const result = document.getElementById("result");

    const city = cityInput.value.trim();

    if (!city) {
        result.innerHTML = `
            <div class="error">
                Please enter a city name.
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="welcome-card">
            <h2>⏳ Loading...</h2>
            <p>Getting the latest weather for ${city}.</p>
        </div>
    `;

    try {
        const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (data.error) {
            result.innerHTML = `
                <div class="error">
                    ${data.error}
                </div>
            `;
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

        result.innerHTML = `
            <div class="weather-card">

                <h2>${data.city}, ${data.country}</h2>

                <img
                    src="https://openweathermap.org/img/wn/${data.icon}@2x.png"
                    alt="${data.description}"
                >

                <h3>${data.description}</h3>

                <p>🌡 Temperature: <strong>${data.temperature}°F</strong></p>
                <p>🤗 Feels Like: <strong>${data.feels_like}°F</strong></p>
                <p>💧 Humidity: <strong>${data.humidity}%</strong></p>
                <p>💨 Wind: <strong>${data.wind} mph</strong></p>
                <p>🌡 Pressure: <strong>${data.pressure} hPa</strong></p>
                <p>☁ Cloud Cover: <strong>${data.clouds}%</strong></p>
                <p>👀 Visibility: <strong>${data.visibility} km</strong></p>
                <p>🌅 Sunrise: <strong>${sunrise}</strong></p>
                <p>🌇 Sunset: <strong>${sunset}</strong></p>

            </div>
        `;

    } catch (error) {
        result.innerHTML = `
            <div class="error">
                Unable to connect to the weather service.<br><br>
                Please check your internet connection and try again.
            </div>
        `;
    }
}

document.getElementById("city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
