import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Search(props) {
  const location = useLocation();
  const { searchData } = location.state || {};
  const [storedProducts, setStoredProducts] = useState([]);
  const [foundSearch, setFoundSearch] = useState([]);
  useEffect(() => {
    const Products = JSON.parse(localStorage.getItem("products")) || [];
    setStoredProducts(Products);
  }, []);
  useEffect(() => {
    const filteredProducts = storedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setFoundSearch(filteredProducts);
  }, [searchData, storedProducts]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4 mt-4">
        {foundSearch.map((product) => (
          <Link to={`/Dashboard/product/${product.id}`}>
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-105 duration-300 ">
              <img
                className="w-full h-48 object-cover"
                src={product.image}
                alt=""
              />
              <div className="p-4">
                <h1>{product.name}</h1>

                <p className="text-gray-600 text-sm mb-2">
                  Category: {product.Category || "N/A"}
                </p>
                <p className="text-green-600 font-bold">
                  Price: ${parseFloat(product.price).toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
