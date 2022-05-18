import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import SelectedCity from "./SelectedCity";

export default function SearchAndCompareCities({
  cities,
  setSuggestionCities,
  suggestionCities,
  selectedCities,
  setSelectedCities,
}) {
  const [searchKey, setSearchKey] = useState("");
  const [displayValuesColor, setDisplayValuesColor] = useState(false);
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

  const onClickCityHandler = (city) => {
    const url = `https://docs.openaq.org/v2/latest?limit=1&page=1&offset=0&sort=asc&radius=1000&country=GB&city=${city}&order_by=location&dumpRaw=false`;
    const fetchCity = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const cityData = data.results[0];
      const cityExists = selectedCities.find(
        (selectedCity) => selectedCity.city === cityData.city
      );
      if (!cityExists) {
        setSelectedCities([cityData, ...selectedCities]);
      }
    };
    try {
      fetchCity();
      setSearchKey("");
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDisplayValuesColor = () => {
    setDisplayValuesColor(!displayValuesColor);
  };
  const allCities = cities.map((city, i) => (
    <li onClick={() => onClickCityHandler(city.city)} key={`${i} - ${city}`}>
      {city.city}
    </li>
  ));
  const suggestedCities = suggestionCities.map((city, i) => (
    <li onClick={() => onClickCityHandler(city.city)} key={`${i} - ${city}`}>
      {city.city}
    </li>
  ));
  const allSelectedCities = selectedCities.map((selectedCity, i) => {
    return (
      <SelectedCity
        key={`Selected city - ${i} - ${selectedCity.city}`}
        selectedCity={selectedCity}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        displayValuesColor={displayValuesColor}
        setDisplayValuesColor={setDisplayValuesColor}
      />
    );
  });
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
      <section className="selectedCities">{allSelectedCities}</section>
      {selectedCities.length > 0 && (
        <button className="btn" onClick={toggleDisplayValuesColor}>
          {displayValuesColor ? "Hide" : "Show"} Color
        </button>
      )}
    </div>
  );
}
