import React, { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

const CategoryHeader = () => {
  const [show, setShow] = useState(false);
  const { getProducts } = useContext(Context);
  const productsCategory = getProducts() || [];

  const uniqueCategory = Array.isArray(productsCategory)
    ? Array.from(new Set(productsCategory.map((item) => item?.Category)))
    : [];

  function showSlider() {
    setShow((prev) => !prev);
  }

  return (
    <div>
      <button
        onClick={showSlider}
        className="hidden sm:block bg-white text-black hover:bg-black hover:text-white rounded-md px-3 py-1 transition duration-300 mr-2 "
      >
        Categories
      </button>

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
              {uniqueCategory.map((category, index) => (
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

export default CategoryHeader;
