import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { calculateTimeDifferenceInAnEasyToReadFormat } from "./utils";

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
