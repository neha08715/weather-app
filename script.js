async function getWeather() {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim(); // Trim to remove any leading/trailing spaces

  if (cityName === '') {
    document.getElementById('weatherInfo').innerText = 'Please enter a city name';
    document.getElementById('weatherIcon').innerHTML = ''; // Clear any previous icon
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404') {
      document.getElementById('weatherInfo').innerText = 'City not found';
      document.getElementById('weatherIcon').innerHTML = ''; // Clear any previous icon
    } else {
      const weatherInfo = `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C, Humidity: ${data.main.humidity}%`;
      document.getElementById('weatherInfo').innerText = weatherInfo;

      // Set weather icon based on the weather condition
      const weatherIcon = document.getElementById('weatherIcon');
      const weatherCondition = data.weather[0].main.toLowerCase();

      switch (weatherCondition) {
        case 'wind':
          weatherIcon.innerHTML = '<img src="wind.png" alt="Wind">';
          break;
        case 'snow':
          weatherIcon.innerHTML = '<img src="snow.png" alt="Snow">';
          break;
        default:
          weatherIcon.innerHTML = ''; // Clear the icon if no matching condition
      }
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weatherInfo').innerText = 'Error fetching weather data';
    document.getElementById('weatherIcon').innerHTML = ''; // Clear any previous icon
  }
}


