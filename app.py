from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = "307f49911c2cb990130b44d16feef9cf"

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/weather")
def weather():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "Please enter a city."})

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=imperial"
    )

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if response.status_code != 200:
            return jsonify({
                "error": data.get("message", "City not found.")
            })

        weather = {
            "city": data["name"],
            "country": data["sys"]["country"],
            "temperature": round(data["main"]["temp"]),
            "feels_like": round(data["main"]["feels_like"]),
            "humidity": data["main"]["humidity"],
            "wind": data["wind"]["speed"],
            "description": data["weather"][0]["description"].title(),
            "icon": data["weather"][0]["icon"]
        }

        return jsonify(weather)

    except Exception:
        return jsonify({
            "error": "Unable to connect to the weather service."
        })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
