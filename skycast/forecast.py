"""
SkyCast

Module: Forecast
Version: 1.2.0

Retrieves the 5-day / 3-hour forecast from OpenWeather.
"""

import requests

from config import API_KEY, UNITS

FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


def get_forecast(city):
    """
    Get the 5-day forecast for a city.

    Returns:
        list: Forecast entries
        dict: {"error": "..."} on failure
    """

    params = {
        "q": city,
        "appid": API_KEY,
        "units": UNITS,
    }

    try:
        response = requests.get(
            FORECAST_URL,
            params=params,
            timeout=10,
        )
        response.raise_for_status()
        data = response.json()

    except requests.RequestException:
        return {
            "error": "Unable to connect to the forecast service."
        }

    if str(data.get("cod")) != "200":
        return {
            "error": data.get("message", "Forecast unavailable.")
        }

    forecast = []

    for item in data["list"]:
        forecast.append({
            "time": item["dt_txt"],
            "temperature": round(item["main"]["temp"]),
            "feels_like": round(item["main"]["feels_like"]),
            "humidity": item["main"]["humidity"],
            "description": item["weather"][0]["description"].title(),
            "icon": item["weather"][0]["icon"],
            "wind": item["wind"]["speed"],
        })

    return forecast
