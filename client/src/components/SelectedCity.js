import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function SelectedCity() {
  return (
    <div className="cityContainer">
      <div className="info">
        {" "}
        <p>UPDATED AN HOUR AGO</p>
        <h3>Manchester Piccadily</h3>
        <p>in Manchester, United Kingdom</p>
        <p>Values: PM25: 9, SO2: 32, O3: 8, NO2: 43</p>
      </div>
      <div className="removeCityButton">
        <AiOutlineClose />
      </div>
    </div>
  );
}
