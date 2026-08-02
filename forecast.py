"""
SkyCast Forecast Module
Version 1.2.0

This module will contain forecast-related functions.
"""

import requests

from config import API_KEY, UNITS

FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"
