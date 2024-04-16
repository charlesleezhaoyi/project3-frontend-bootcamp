import React from "react";

const SearchBar = ({ searchParams, setSearchParams, handleSubmit }) => {
  return (
    <>
      <form
        className="flex items-center max-w-md mx-auto rounded-full border border-gray-200 space-x-3 mt-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-full focus:outline-none"
          value={searchParams.get("q") || ""}
          onChange={(e) => setSearchParams({ q: e.target.value })}
        />
        <button
          type="submit"
          className="flex items-center justify-center w-12 h-10 text-white rounded-full bg-amber-400 hover:bg-amber-600 focus:outline-none"
        >
          <svg
            className="w-5 h-5"
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
    </>
  );
};

export default SearchBar;
