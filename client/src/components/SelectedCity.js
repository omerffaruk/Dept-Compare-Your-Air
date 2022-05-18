import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { calculateTimeDifferenceInAnEasyToReadFormat } from "./utils";

export default function SelectedCity({
  selectedCity,
  selectedCities,
  setSelectedCities,
  displayValuesColor,
}) {
  const handleRemoveCity = () => {
    const newSelectedCities = selectedCities.filter(
      (city) => city.city !== selectedCity.city
    );
    setSelectedCities(newSelectedCities);
  };

  const values = selectedCity.measurements.map((measurement, i, arr) => (
    <span
      key={`${i} - measurement`}
      className={`valuesSpan ${displayValuesColor && "displayColor"} ${
        measurement.value <= 15
          ? "green"
          : measurement.value <= 50
          ? "yellow"
          : "orange"
      }`}
    >
      {measurement.parameter.toUpperCase()}: {measurement.value}
      {i !== arr.length - 1 && !displayValuesColor ? "," : ""}
    </span>
  ));

  const lastUpdatedValues = selectedCity.measurements.map(
    (measurement) => measurement.lastUpdated
  );
  const updatedTimeAgoInEasyToReadFormat =
    calculateTimeDifferenceInAnEasyToReadFormat(lastUpdatedValues);
  return (
    <div className="cityContainer">
      <div className="info">
        {" "}
        <p>UPDATED {updatedTimeAgoInEasyToReadFormat} AGO</p>
        <h3>{selectedCity.location}</h3>
        <p>in {selectedCity.city}, United Kingdom</p>
        <p>Values: {values}</p>
      </div>
      <div className="removeCityButton">
        <AiOutlineClose onClick={handleRemoveCity} />
      </div>
    </div>
  );
}
