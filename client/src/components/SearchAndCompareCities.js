import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import SelectedCity from "./SelectedCity";

export default function SearchAndCompareCities() {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div>
      <div className="searchContainer">
        <MdSearch style={{ fontSize: "24px" }} />
        <input
          type="text"
          placeholder="Enter city name..."
          className="searchInput"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <section className="selectedCities">
        <SelectedCity />
      </section>
    </div>
  );
}
