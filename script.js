document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "97d624c5b410649001c655d9a2baee82"; //env variable

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        //it may thron error
        //server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError("City not found. Please enter a valid city name.");
        }
    });

    cityInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            getWeatherBtn.click();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);

        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;


        //unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    }

    function showError(message) {
        weatherInfo.classList.add('hidden');
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});