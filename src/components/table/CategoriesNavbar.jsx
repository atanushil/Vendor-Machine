import React, { useState } from 'react';

const categories = [
  { label: 'Category 1' },
  { label: 'Category 2' },
  { label: 'Category 3' },
  { label: 'Category 4' },
  { label: 'Category 5' },
  { label: 'Category 6' },
];

const CategoriesNavbar = ({setCategory}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
