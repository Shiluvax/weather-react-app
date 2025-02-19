import "./styles.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const apiKey = "eb9542c65e739e0fb25ade97c749e2aa";

  const search = async () => {
    if (query) {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`,
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`,
        );
        setForecast(forecastResponse.data.list.slice(0, 5)); // Get forecast for the next 5 time points
        setQuery("");
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="app">
      <h1> Weather App</h1>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={search} className="search-button">
            Enter
          </button>
        </div>
        {weather.main && (
          <div className="weather-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        )}
        {forecast.length > 0 && (
          <div className="forecast-box">
            <h3>Forecast</h3>
            {forecast.map((item, index) => (
              <div key={index} className="forecast-item">
                <div>{new Date(item.dt_txt).toLocaleTimeString()}</div>
                <div>{Math.round(item.main.temp)}°C</div>
                <div>{item.weather[0].description}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer>
        This project was coded by{" "}
        <a href="https://github.com/Shiluvax" target="_blank">
          Xiluva Monareng
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/Shiluvax/weather-react-app "
          target="_blank"
        >
          open-sourced on GitHub
        </a>{" "}
        and{" "}
        <a href=" https://shiluva-react-app.netlify.app/ " target="_blank">
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
};

export default App;
