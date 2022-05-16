import { useEffect, useState } from "react";
import "./App.css";
import SearchAndCompareCities from "./components/SearchAndCompareCities";

function App() {
  const [cities, setCities] = useState([]);
  const [suggestionCities, setSuggestionCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  useEffect(() => {
    const urlToFetchUKCities = `https://docs.openaq.org/v2/cities?limit=300&page=1&offset=0&sort=asc&country=GB&order_by=city`;
    const fetchCities = async () => {
      const response = await fetch(urlToFetchUKCities);
      const data = await response.json();
      setCities(data.results);
    };
    try {
      fetchCities();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Compare your Air</h1>
        <p>Compare the air quality between cities in the UK.</p>
        <p>Select cities to compare using the search tool below.</p>
      </header>
      <main>
        <SearchAndCompareCities
          setSuggestionCities={setSuggestionCities}
          cities={cities}
          suggestionCities={suggestionCities}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
      </main>
    </div>
  );
}

export default App;
