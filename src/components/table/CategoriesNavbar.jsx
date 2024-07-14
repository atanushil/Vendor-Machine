import React, { useState } from 'react';

const CategoriesNavbar = ({ setCategory,categories }) => {
  // Initialize selectedCategory to the label of the first category
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);

  const handleCategoryClick = (label) => {
    setSelectedCategory(label);
    console.log(`${label} got clicked`);
    setCategory(label);
  };
  return (
    <nav className="p-1">
      <ul className="flex justify-evenly">
        {categories.map((category) => (
          <li
            key={category.label}
            className={`w-full flex py-2 items-center hover:bg-blue-300  justify-center border-2  ${
              selectedCategory === category.label ? 'bg-blue-500 border-blue-900 text-white' : 'bg-white'
            }`}
          >
            <button
              onClick={() => handleCategoryClick(category.label)}
              className="text-blue-800 hover:text-blue-400  w-full"
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
