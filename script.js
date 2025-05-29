const apiKey = "fcc8de7015bbb202209bbf0261babf4c";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather(searchBox.value);
    }
});

function getWeather(city) {
    fetch(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error fetching weather data:", error));
}

function displayWeather(weather) {
    if (weather.cod !== 200) {
        alert("City not found!");
        return;
    }

    const cityElem = document.querySelector(".city");
    const dateElem = document.querySelector(".date");
    const tempElem = document.querySelector(".temp");
    const weatherElem = document.querySelector(".weather");
    const hiLowElem = document.querySelector(".hi-low");

    cityElem.textContent = `${weather.name}, ${weather.sys.country}`;

    const now = new Date();
    dateElem.textContent = now.toDateString();

    tempElem.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    weatherElem.textContent = weather.weather[0].main;
    hiLowElem.textContent = `${Math.round(weather.main.temp_min)}°/${Math.round(weather.main.temp_max)}°c`;
}
