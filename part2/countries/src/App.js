import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={Object.values(country.flags)[0]} />
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const handleCountrieChange = (e) => {
    setCountryQuery(e.target.value);
  };
  const handleShowCountry = (country) => {
    setCountryQuery(country);
  };
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);
  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.common.slice(0, countryQuery.length).toLowerCase() ===
          countryQuery.toLowerCase()
      )
    );
  }, [countryQuery]);
  return (
    <div className="App">
      find countries{" "}
      <input type="text" onChange={handleCountrieChange} value={countryQuery} />
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specific another filter</p>
      ) : (
        filteredCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountry(country.name.common)}>
              {" "}
              show{" "}
            </button>{" "}
          </p>
        ))
      )}
    </div>
  );
}

export default App;
