"""
SkyCast

Module: Utilities
Version: 1.2.0

Shared helper functions used throughout SkyCast.
"""

from datetime import datetime


def format_timestamp(timestamp):
    """
    Convert a Unix timestamp into a readable local time.

    Example:
        1754256000 -> 7:30 AM
    """

    return datetime.fromtimestamp(timestamp).strftime("%I:%M %p").lstrip("0")


def title(text):
    """
    Convert text into title case.

    Example:
        scattered clouds -> Scattered Clouds
    """

    return text.title()


def celsius_to_fahrenheit(celsius):
    """
    Convert Celsius to Fahrenheit.
    """

    return round((celsius * 9 / 5) + 32)


def fahrenheit_to_celsius(fahrenheit):
    """
    Convert Fahrenheit to Celsius.
    """

    return round((fahrenheit - 32) * 5 / 9)
