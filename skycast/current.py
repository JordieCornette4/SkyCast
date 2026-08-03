"""
SkyCast

Module: Current Weather
Version: 1.2.0
"""

import requests

from config import API_KEY, UNITS


CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_current_weather(city):
    """
    Fetch the current weather for a city.

    Returns:
        dict: Weather data on success.
        dict: {"error": "..."} on failure.
    """

    params = {
        "q": city,
        "appid": API_KEY,
        "units": UNITS,
    }

    try:
        response = requests.get(CURRENT_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

    except requests.RequestException:
        return {
            "error": "Unable to connect to the weather service."
        }

    if str(data.get("cod")) != "200":
        return {
            "error": data.get("message", "City not found.")
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
