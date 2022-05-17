import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function SelectedCity({
  selectedCity,
  selectedCities,
  setSelectedCities,
}) {
  const handleRemoveCity = () => {
    const newSelectedCities = selectedCities.filter(
      (city) => city.city !== selectedCity.city
    );
    setSelectedCities(newSelectedCities);
  };
  let valuesString = `Values: `;
  selectedCity.measurements.forEach((measurement, i, arr) => {
    valuesString += `${measurement.parameter.toUpperCase()}: ${
      measurement.value
    }${i !== arr.length - 1 ? "," : ""} `;
  });
  let nowMs = Date.now();
  let latestInMs = nowMs;
  selectedCity.measurements.forEach((measurement) => {
    let msBetweenNowAndLastUpdated =
      nowMs - Date.parse(measurement.lastUpdated);
    if (msBetweenNowAndLastUpdated < latestInMs) {
      latestInMs = msBetweenNowAndLastUpdated;
    }
  });
  let latestInMinutes = Math.round(latestInMs / 60000);
  let latestInHours = Math.round(latestInMs / 3600000);
  let latestInDays = Math.round(latestInMs / 86400000);
  let latestInWeeks = Math.round(latestInMs / 604800000);
  let latestInMonths = Math.round(latestInMs / 2629800000);
  let latestInYears = Math.round(latestInMs / 31557600000);
  let latestInString = "";
  if (latestInMinutes < 60) {
    latestInString = `${latestInMinutes} minutes`;
  } else if (latestInHours < 24) {
    latestInString = `${latestInHours} hours`;
  } else if (latestInDays < 7) {
    latestInString = `${latestInDays} days`;
  } else if (latestInWeeks < 4) {
    latestInString = `${latestInWeeks} weeks`;
  } else if (latestInMonths < 12) {
    latestInString = `${latestInMonths} months`;
  } else {
    latestInString = `${latestInYears} years`;
  }
  return (
    <div className="cityContainer">
      <div className="info">
        {" "}
        <p>UPDATED {latestInString.toUpperCase()} AGO</p>
        <h3>{selectedCity.city}</h3>
        <p>in {selectedCity.city}, United Kingdom</p>
        <p>{valuesString}</p>
      </div>
      <div className="removeCityButton">
        <AiOutlineClose onClick={handleRemoveCity} />
      </div>
    </div>
  );
}
