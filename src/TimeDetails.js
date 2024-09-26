import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { GiSunrise, GiSunset } from "react-icons/gi";

const TimeDetails = ({ localTime, sunrise, sunset }) => {
  return (
    <>
      <div className="info-row">
        <FontAwesomeIcon icon={faClock} className="custom-icon" />
        <h1>Local Time: {localTime}</h1>
      </div>
      <div className="info-row sunrise">
        <GiSunrise size={40} />
        <h2>Sunrise: {sunrise}</h2>
        <GiSunset size={40} />
        <h2>Sunset: {sunset}</h2>
      </div>
    </>
  );
};

export default TimeDetails;
