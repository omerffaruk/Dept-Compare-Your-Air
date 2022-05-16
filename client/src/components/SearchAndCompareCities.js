import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import SelectedCity from "./SelectedCity";

export default function SearchAndCompareCities({
  cities,
  setSuggestionCities,
  suggestionCities,
}) {
  const [searchKey, setSearchKey] = useState("");
  const onChangeHandler = (text) => {
    setSearchKey(text);
    if (text.length > 0) {
      text = text.trim();
      const suggestedCities = cities.filter((city) => {
        const cityNameLowerCase = city.city.toLowerCase();
        const searchKeyLowerCase = text.toLowerCase();
        return cityNameLowerCase.startsWith(searchKeyLowerCase);
      });
      setSuggestionCities(suggestedCities);
    } else {
      setSuggestionCities(cities);
    }
  };
  const onBlurHandler = () => {
    setTimeout(() => {
      document.getElementById("suggestedCities").style.display = "none";
    }, 100);
  };
  const onClickHandler = () => {
    document.getElementById("suggestedCities").style.display = "block";
  };
  const allCities = cities.map((city, i) => (
    <li key={`${i} - ${city}`}>{city.city}</li>
  ));
  const suggestedCities = suggestionCities.map((city, i) => (
    <li key={`${i} - ${city}`}>{city.city}</li>
  ));
  return (
    <div className="searchAndCompareCitiesContainer">
      <div className="searchContainer">
        <MdSearch style={{ fontSize: "24px" }} />
        <input
          type="text"
          placeholder="Enter city name..."
          className="searchInput"
          onChange={(e) => onChangeHandler(e.target.value)}
          onBlur={onBlurHandler}
          onClick={onClickHandler}
          value={searchKey}
        />
      </div>
      <ul className="suggestedCities" id="suggestedCities">
        {searchKey.length === 0 ? (
          allCities
        ) : suggestionCities.length ? (
          suggestedCities
        ) : (
          <li>No city found</li>
        )}
      </ul>
      <section className="selectedCities">
        <SelectedCity />
      </section>
    </div>
  );
}
