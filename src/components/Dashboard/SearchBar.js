import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-md mx-auto bg-white rounded-full border border-gray-200"
    >
      <input
        type="search"
        name="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-full focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
