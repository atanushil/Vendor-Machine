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
      <ul className="flex justify-evenly gap-1">
        {categories.map((category) => (
          <li
            key={category.label}
            className={`w-full flex py-2 items-center hover:bg-blue-300 active:font-medium hover:text-slate-100 justify-center  lg:text-xl text-[12px] ${
              selectedCategory === category.label ? 'bg-blue-500 border-blue-900 font-medium text-white' : 'bg-white'
            }`}
          >
            <button
              onClick={() => handleCategoryClick(category.label)}
              className=" w-full"
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
