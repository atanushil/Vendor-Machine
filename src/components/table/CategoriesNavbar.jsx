import React, { useEffect, useState } from 'react';

const CategoriesNavbar = ({ setCategory,categories }) => {
  // Initialize selectedCategory to the label of the first category
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);

  const handleCategoryClick = (label) => {
    setSelectedCategory(label);
    console.log(`${label} got clicked`);
    setCategory(label);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-evenly">
        {categories.map((category) => (
          <li
            key={category.label}
            className={`w-full flex py-2 items-center justify-center border-2 border-black ${
              selectedCategory === category.label ? 'bg-blue-500' : 'bg-white'
            }`}
          >
            <button
              onClick={() => handleCategoryClick(category.label)}
              className="text-gray-300 hover:text-white w-full"
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesNavbar;
