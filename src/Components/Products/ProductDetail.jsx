import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context/Context";

function ProductDetail() {
  const { id } = useParams();

  const { addToCart, removeFromCart } = useContext(Context);
  const storedProduct = JSON.parse(localStorage.getItem("products")) || [];
  const foundedProduct = storedProduct.find((item) => item?.id === id);

  const productArr = foundedProduct ? [foundedProduct] : [];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-4">
      {productArr.length > 0 ? (
        productArr.map((item) => (
          <div
            key={item?.id}
            className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden flex gap-10 pb-10"
          >
            <img className="rounded-md w-60" src={item.image} alt={item.name} />
            <div className="p-4 flex flex-col gap-4">
              <div>
                <h1>{item?.name}</h1>
                <p className="text-gray-600 text-sm mb-2">
                  Category: {item?.Category || "N/A"}
                </p>
                <p className="text-green-600 font-bold">
                  Price: ${parseFloat(item?.price).toFixed(2)}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-500">Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetail;
