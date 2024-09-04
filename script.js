const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');

// Function to fetch weather data
async function getWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Location not found');

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { main, weather, name } = data;
    const weatherHTML = `
        <h2>Weather in ${name}</h2>
        <img src="images/${weather[0].icon}.png" alt="${weather[0].description}">
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Conditions:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
    `;
    weatherInfo.innerHTML = weatherHTML;
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeather(location);
    } else {
        weatherInfo.innerHTML = '<p class="error">Please enter a location.</p>';
    }
});

// Optional: Get weather based on user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeather(`lat=${latitude}&lon=${longitude}`);
    });
}
