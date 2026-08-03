"""
SkyCast

Reusable weather package.
Version: 1.2.0
"""

from skycast.weather import (
    get_coordinates,
    get_current_weather,
    get_forecast,
)

__version__ = "1.2.0"

__all__ = [
    "get_coordinates",
    "get_current_weather",
    "get_forecast",
]
