import React from "react";

const SearchForm = ({ searchCity, setSearchCity, handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
