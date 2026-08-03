"""
SkyCast

Module: Weather
Version: 1.2.0

Public interface for the SkyCast weather package.
"""

from skycast.current import get_current_weather
from skycast.forecast import get_forecast
from skycast.geocoding import get_coordinates

__all__ = [
    "get_current_weather",
    "get_forecast",
    "get_coordinates",
]
