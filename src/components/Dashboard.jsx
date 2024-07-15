import React, { useState } from "react";
import DataTable from "./table/DataTable";
import CategoriesNavbar from "./table/CategoriesNavbar";
import DataCategory from "./data/data"; // Ensure correct import

const Dashboard = () => {
  // Extract categories from the imported data
  const categories = Object.values(DataCategory); // Get categories as an array
  const [category, setCategory] = useState(categories[0]?.label || null); // Set initial category safely

  return (
    <div className=" rounded-lg w-[95vw] border-none shadow-none lg:h-[85vh] h-[66vh]  lg:mt-0 -mt-32">
      <ul className="flex sm:justify-end justify-center pb-2 px-4 w-full gap-4">
        <li>
          <button
            className="p-1 border-2 px-4 rounded-md bg-blue-200 hover:bg-orange-300 active:bg-orange-600 active:text-gray-300 active:font-medium"
            onClick={() => alert("upload file")}
          >
            Upload file
          </button>
        </li>
        <li>
          <button
            className="p-1 border-2 px-4 rounded-md bg-green-200 hover:bg-green-300 active:bg-green-600 active:text-gray-300 active:font-medium"
            onClick={() => alert("Send all message.")}
          >
            Send Mail
          </button>
        </li>
      </ul>
      <div className="pt-1  ">
        <CategoriesNavbar setCategory={setCategory} categories={categories} />
      </div>
      <div className="sm:h-[65vh] h-full">
        <DataTable
          rows={categories.find(cat => cat.label === category)?.rows || []}
          checkbox={false}
          category={category}
        />
      </div>

      {/* Optional: Display selected category */}
      {/* <div className="text-center mt-4">Selected Category: {category}</div> */}
    </div>
  );
};

export default Dashboard;
