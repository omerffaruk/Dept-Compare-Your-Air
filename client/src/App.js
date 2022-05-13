import "./App.css";
import SearchAndCompareCities from "./components/SearchAndCompareCities";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Compare your Air</h1>
        <p>Compare the air quality between cities in the UK.</p>
        <p>Select cities to compare using the search tool below.</p>
      </header>
      <main>
        <SearchAndCompareCities />
      </main>
    </div>
  );
}

export default App;
