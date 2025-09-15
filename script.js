// Replace with your OpenWeatherMap API key
const apiKey = "bf6edf47d4d07849eac4b5fb007bbf37";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Show loading animation
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("weatherResult").classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Update date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    document.getElementById("date").textContent = dateStr;

    // Update DOM with weather data
    document.getElementById("cityName").textContent = data.name + ", " + data.sys.country;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("condition").textContent = data.weather[0].description;
    document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Hide loading, show weather result
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("weatherResult").classList.remove("hidden");

  } catch (error) {
    document.getElementById("loading").classList.add("hidden");
    alert("Error: " + error.message);
  }
}

// Allow searching with Enter key
document.getElementById("cityInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});