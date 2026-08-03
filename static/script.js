/*
SkyCast
Version: 1.2.0
*/

async function getWeather() {

    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("result");

    if (!city) {

        result.innerHTML = `
            <div class="error">
                Please enter a city.
            </div>
        `;

        return;
    }

    result.innerHTML = `
        <div class="welcome-card">
            <h2>Loading...</h2>
            <p>Getting weather for <strong>${city}</strong>.</p>
        </div>
    `;

    try {

        const response = await fetch(
            `/weather?city=${encodeURIComponent(city)}`
        );

        const data = await response.json();

        if (data.error) {

            result.innerHTML = `
                <div class="error">
                    ${data.error}
                </div>
            `;

            return;
        }

        const sunrise = new Date(
            data.sunrise * 1000
        ).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

        const sunset = new Date(
            data.sunset * 1000
        ).toLocaleTimeString([], {
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

                <p>🌡 Temperature: ${data.temperature}°</p>

                <p>🤗 Feels Like: ${data.feels_like}°</p>

                <p>💧 Humidity: ${data.humidity}%</p>

                <p>💨 Wind: ${data.wind}</p>

                <p>🌡 Pressure: ${data.pressure} hPa</p>

                <p>☁ Cloud Cover: ${data.clouds}%</p>

                <p>👀 Visibility: ${data.visibility} km</p>

                <p>🌅 Sunrise: ${sunrise}</p>

                <p>🌇 Sunset: ${sunset}</p>

            </div>
        `;

    } catch (error) {

        result.innerHTML = `
            <div class="error">
                Unable to connect to SkyCast.
            </div>
        `;

    }

}

document
    .getElementById("city")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            getWeather();
        }

    });
