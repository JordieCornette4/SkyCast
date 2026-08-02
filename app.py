from flask import Flask, render_template, request, jsonify

from config import HOST, PORT, DEBUG
from weather import get_current_weather

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/weather")
def weather():

    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({
            "error": "Please enter a city."
        })

    return jsonify(get_current_weather(city))


@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(
        host=HOST,
        port=PORT,
        debug=DEBUG
    )
