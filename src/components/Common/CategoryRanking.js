import React, { useState } from "react";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
];

const CategoryRanking = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (event, category) => {
    event.preventDefault(); // Prevent the default form submit behavior
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        // If it is, remove it from the array
        return prevSelected.filter((c) => c !== category);
      } else {
        // If it's not, add it to the array
        return [...prevSelected, category];
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-2 p-5">
        {categories.map((category) => (
          <button
            type="button" // Explicitly declare the button type
            key={category}
            onClick={(e) => toggleCategory(e, category)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategories.includes(category)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p className="mb-2 text-lg font-semibold">Your Preferences:</p>
        <ol className="list-decimal pl-5">
          {selectedCategories.map((category) => (
            <li key={category} className="py-1">
              {category}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CategoryRanking;
