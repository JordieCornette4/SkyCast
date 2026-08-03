/*
SkyCast

Favorites Module
Version: 1.1.0
*/

const STORAGE_KEY = "skycast-favorites";

let favoriteCities = loadFavorites();

function loadFavorites() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        return saved ? JSON.parse(saved) : [];

    } catch {

        return [];

    }

}

function saveFavorites() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favoriteCities)
    );

}

function renderFavorites() {

    const container = document.getElementById("favorites-container");

    if (!container) {
        return;
    }

    if (favoriteCities.length === 0) {

        container.innerHTML = `
            <div class="welcome-card">
                <h3>⭐ Favorite Cities</h3>
                <p>No favorite cities yet.</p>
            </div>
        `;

        return;

    }

    let html = `
        <div class="welcome-card">

            <h3>⭐ Favorite Cities</h3>
    `;

    favoriteCities.forEach(city => {

        html += `
            <button
                class="favorite-button"
                onclick="selectFavorite('${city}')"
            >
                ${city}
            </button>
        `;

    });

    html += `
        </div>
    `;

    container.innerHTML = html;

}

function addFavorite(city) {

    city = city.trim();

    if (!city || favoriteCities.includes(city)) {
        return;
    }

    favoriteCities.push(city);

    saveFavorites();

    renderFavorites();

}

function selectFavorite(city) {

    document.getElementById("city").value = city;

    getWeather();

}

document.addEventListener("DOMContentLoaded", renderFavorites);
