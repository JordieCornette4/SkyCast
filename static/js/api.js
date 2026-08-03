/*
SkyCast

API Module
Version: 1.3.0
*/

async function fetchWeather(city) {
    const response = await fetch(
        `/weather?city=${encodeURIComponent(city)}`
    );

    return await response.json();
}

async function fetchForecast(city) {
    const response = await fetch(
        `/forecast?city=${encodeURIComponent(city)}`
    );

    return await response.json();
}
