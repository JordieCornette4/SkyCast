/*
SkyCast

API Module
Version: 1.4.0
*/

async function apiRequest(endpoint, city) {

    const response = await fetch(
        `/${endpoint}?city=${encodeURIComponent(city)}`
    );

    const data = await response.json();

    return data;

}

async function fetchWeather(city) {
    return await apiRequest("weather", city);
}

async function fetchForecast(city) {
    return await apiRequest("forecast", city);
}
