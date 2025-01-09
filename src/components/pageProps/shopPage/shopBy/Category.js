import React, { useState, useEffect } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { getCategory } from "../../../../services";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [expanded, setExpanded] = useState({});

  const fetchCategoryData = async () => {
    try {
      const response = await getCategory();
      setCategoryList(response || [ ]);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Recursive function to render categories
  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category._id} className="border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id={category._id} />
          <label htmlFor={category._id} className="cursor-pointer">
            {category.categoryName}
          </label>
          {category.children && category.children.length > 0 && (
            <span
              onClick={() => toggleExpand(category._id)}
              className="text-xs cursor-pointer ml-auto hover:text-blue-500"
            >
              <ImPlus />
            </span>
          )}
        </div>
        {expanded[category._id] && category.children.length > 0 && (
          <ul className="ml-6 mt-2 border-l border-gray-300 pl-4">
            {renderCategories(category.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-600">
          {renderCategories(categoryList)}
        </ul>
      </div>
    </div>
  );
};

export default Category;