import React, { useState } from "react";
import axios from "axios";


// Import FontAwesome icons and react-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faClock} from '@fortawesome/free-solid-svg-icons';
import { GiSunrise, GiSunset } from "react-icons/gi";

const WeatherAndTime = () => {
  const [city, setCity] = useState(""); // City name from API
  const [searchCity, setSearchCity] = useState(""); // City to search for
  const [localTime, setLocalTime] = useState("");
  const [country, setCountry] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [temperature, setTemperature] = useState(""); // Temperature in Celsius
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(""); // OpenWeather icon code
  const [error, setError] = useState(null);

 

  const fetchWeatherAndTime = async () => {
    try {
      // Get weather data, including temperature, coordinates, and country
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const { sys, main, name, weather,timezone } = weatherResponse.data;
      console.log(weatherResponse.data)
      const { country,sunrise,sunset } = sys;
      const { temp } = main;
      const { feels_like } = main;// Temperature in Celsius

      setCountry(country);
      setCity(name);
      setTemperature(temp)
      setFeelsLike(feels_like);
     

      // Set weather icon from OpenWeather data
      const weatherIconCode = weather[0].icon;
      setWeatherIcon(`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`);


      // Convert sunrise and sunset timestamps to readable time
      const localSunrise = new Date((sunrise + timezone) * 1000).toLocaleTimeString();
      const localSunset  = new Date((sunset  + timezone) * 1000).toLocaleTimeString();
   
      setSunrise(localSunrise);
      setSunset(localSunset);

      // Calculate the local time using timezone offset
      const timezoneOffset = weatherResponse.data.timezone; // Timezone offset in seconds
      const currentDate = new Date();
      const localDate = new Date(currentDate.getTime() + timezoneOffset * 1000);

      setLocalTime(localDate.toLocaleTimeString());
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Unable to fetch data. Please check the city name and try again.");
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    fetchWeatherAndTime();
  };

  return (
    <div className="container">
      <h1>Search City for Local Time, Country, and Weather</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {!error && city && country && (
        <div className="city-info">
          <h1>City: {city}</h1>
          <h1>Country: {country} / Feels Like {feelsLike}°C</h1>
          
          {/* Display weather icon */}
          <div className="info-row">
            <img src={weatherIcon} alt="Weather Icon" className="icon" />
            <h2>Temperature: {temperature} °C</h2>
            <FontAwesomeIcon icon={faTemperatureHigh} className="custom-icon"/>
          </div>

          {/* Display time with clock icon */}
          <div className="info-row">
            <FontAwesomeIcon icon={faClock} className="custom-icon"/>
            <h1>Local Time: {localTime}</h1>
          </div>
          <div className="info-row sunrise">
            <GiSunrise size={40} />
            <h2>Sunrise: {sunrise}</h2>
            <GiSunset size={40} />
            <h2>Sunset: {sunset}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAndTime;


