/*
SkyCast

UI Module
Version: 1.3.0
*/

function setResult(html) {
    document.getElementById("result").innerHTML = html;
}

function showLoading(city) {
    setResult(`
        <div class="welcome-card">
            <h2>Loading...</h2>
            <p>Getting weather for <strong>${city}</strong>.</p>
        </div>
    `);
}

function showError(message) {
    setResult(`
        <div class="error">
            ${message}
        </div>
    `);
}

function showWelcome() {
    setResult(`
        <div class="welcome-card">
            <h2>Welcome!</h2>
            <p>Enter a city above to see the latest weather.</p>
        </div>
    `);
}
