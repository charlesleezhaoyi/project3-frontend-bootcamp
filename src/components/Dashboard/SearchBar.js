import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

const SearchBar = ({ searchParams, setSearchParams }) => {
  searchBooks = async (searchParams) => {
    const res = await axios.get(`${BACKEND_URL}/books/search/${searchParams}`);
  };

  return (
    <form className="flex items-center max-w-md mx-auto bg-white rounded-full border border-gray-200">
      <input
        type="search"
        name="search"
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-full focus:outline-none"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none"
        onClick={(e) => searchBooks(e.target.value)}
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
