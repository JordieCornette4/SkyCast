"""
SkyCast

Module: Geocoding
Version: 1.2.0

Converts city names into geographic coordinates.
"""

import requests

from config import API_KEY

GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct"


def get_coordinates(city):
    """
    Get latitude and longitude for a city.

    Returns:
        dict: {"latitude": ..., "longitude": ..., "name": ..., "country": ...}
        or {"error": "..."}
    """

    params = {
        "q": city,
        "limit": 1,
        "appid": API_KEY,
    }

    try:
        response = requests.get(
            GEOCODING_URL,
            params=params,
            timeout=10,
        )
        response.raise_for_status()
        data = response.json()

    except requests.RequestException:
        return {
            "error": "Unable to connect to the geocoding service."
        }

    if not data:
        return {
            "error": "City not found."
        }

    location = data[0]

    return {
        "name": location["name"],
        "country": location["country"],
        "latitude": location["lat"],
        "longitude": location["lon"],
    }
