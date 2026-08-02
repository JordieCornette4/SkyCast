import requests
from config import API_KEY, UNITS

GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct"
CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_coordinates(city):
    """
    Convert a city name into latitude and longitude.
    Returns:
        (lat, lon, city_name, country)
        or None if the city isn't found.
    """

    params = {
        "q": city,
        "limit": 1,
        "appid": API_KEY,
    }

    response = requests.get(GEOCODING_URL, params=params, timeout=10)
    response.raise_for_status()

    results = response.json()

    if not results:
        return None

    place = results[0]

    return (
        place["lat"],
        place["lon"],
        place["name"],
        place.get("country", "")
    )


def get_current_weather(city):
    """
    Fetch current weather using the city name.
    Returns a dictionary or an error dictionary.
    """

    params = {
        "q": city,
        "appid": API_KEY,
        "units": UNITS,
    }

    response = requests.get(
        CURRENT_WEATHER_URL,
        params=params,
        timeout=10
    )

    data = response.json()

    if response.status_code != 200:
        return {
            "error": data.get("message", "Unable to fetch weather.")
        }

    return {
    "city": data["name"],
    "country": data["sys"]["country"],
    "temperature": round(data["main"]["temp"]),
    "feels_like": round(data["main"]["feels_like"]),
    "humidity": data["main"]["humidity"],
    "pressure": data["main"]["pressure"],
    "visibility": round(data.get("visibility", 0) / 1000, 1),
    "clouds": data["clouds"]["all"],
    "wind": data["wind"]["speed"],
    "sunrise": data["sys"]["sunrise"],
    "sunset": data["sys"]["sunset"],
    "description": data["weather"][0]["description"].title(),
    "icon": data["weather"][0]["icon"],
    "latitude": data["coord"]["lat"],
    "longitude": data["coord"]["lon"],
}
