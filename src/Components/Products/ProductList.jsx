import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pdetail from "../Waste/Pdetail";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Product List</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {products.map((product, index) => (
            <Link key={product?.id} to={`/Dashboard/product/${product?.id}`}>
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-105 duration-300 "
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product?.image}
                  alt={product?.name}
                />
                <div className="p-4">
                  <h1>{product?.name}</h1>

                  <p className="text-gray-600 text-sm mb-2">
                    Category: {product?.Category || "N/A"}
                  </p>
                  <p className="text-green-600 font-bold">
                    Price: ${parseFloat(product?.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {/* <Pdetail /> */}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No products added yet</p>
      )}
    </div>
  );
};

export default ProductList;
