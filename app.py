"""
SkyCast

Main Flask Application
Version: 1.2.0
"""

from flask import Flask, jsonify, render_template, request

from config import APP_NAME, DEBUG, HOST, PORT
from skycast import get_current_weather, get_forecast

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/weather")
def weather():

    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({
            "error": "Please enter a city."
        })

    return jsonify(get_current_weather(city))


@app.route("/forecast")
def forecast():

    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({
            "error": "Please enter a city."
        })

    return jsonify(get_forecast(city))


@app.errorhandler(404)
def not_found(error):
    return render_template("404.html"), 404


if __name__ == "__main__":
    print(f"Starting {APP_NAME}...")

    app.run(
        host=HOST,
        port=PORT,
        debug=DEBUG,
    )
