import React, { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";
import { UniqueCategory } from "./getUniqueCategory";

const CategorySlider = () => {
  const [show, setShow] = useState(false);
  const { getProducts } = useContext(Context);
  const products = getProducts() || [];
  const Category = UniqueCategory(products);
  function showSlider() {
    setShow((prev) => !prev);
  }

  return (
    <div>
      {/* Menu Icon */}
      <BiMenu
        onClick={showSlider}
        className="text-3xl cursor-pointer md:text-4xl transition-transform hover:scale-110"
      />

      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
          onClick={showSlider}
        >
          {/* Sidebar */}
          <div
            className={`bg-white h-screen w-64 sm:w-72 md:w-80 lg:w-90  p-6 
              fixed `}
          >
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Categories
            </h1>

            {/* Categories List */}
            <ul className="space-y-4 text-lg">
              {Category.map((category, index) => (
                <li
                  key={index}
                  className="hover:text-blue-600 hover:bg-gray-100 p-2 rounded-md transition-all duration-300 ease-in-out  hover:scale-105"
                >
                  <Link
                    to={{
                      pathname: `/Dashboard/${category}`,
                    }}
                    state={{ CategoryName: category.toLowerCase() }}
                    className="block py-2"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
