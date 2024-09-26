import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import TimeDetails from "./TimeDetails";
import WeatherDetails from "./WeatherDetails";

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
      console.log(weatherResponse)
      const { sys, main, name, weather,timezone } = weatherResponse.data;
      const { country,sunrise,sunset } = sys;
      const { temp } = main;
      const { feels_like } = main;
      
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
      const currentDate = new Date();
      const localDate = new Date(currentDate.getTime() + timezone * 1000);

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
      <div className="city-info">
        <h1>Search City for Local Time, Country, and Weather</h1>
        <SearchForm
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          handleSearch={handleSearch}
        />

        {error && <p className="error-message">{error}</p>}
        {!error && city && country && (
          <>
            <WeatherDetails
              city={city}
              country={country}
              temperature={temperature}
              feelsLike={feelsLike}
              weatherIcon={weatherIcon}
            />
            <TimeDetails
              localTime={localTime}
              sunrise={sunrise}
              sunset={sunset}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherAndTime;


