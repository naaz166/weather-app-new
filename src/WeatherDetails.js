import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";

const WeatherDetails = ({
  city,
  country,
  temperature,
  feelsLike,
  weatherIcon,
}) => {
  return (
    <>
      <h1>City: {city}</h1>
      <h1>
        Country: {country} / Feels Like {feelsLike}°C
      </h1>
      <div className="info-row">
        <img src={weatherIcon} alt="Weather Icon" className="icon" />
        <h1>Temperature: {temperature} °C</h1>
        <FontAwesomeIcon icon={faTemperatureHigh} className="custom-icon" />
      </div>
    </>
  );
};

export default WeatherDetails;
