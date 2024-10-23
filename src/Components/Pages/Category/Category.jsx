import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Context from "../../Context/Context";

function Category() {
  const location = useLocation();
  const { CategoryName } = location.state || {};
  const { getProducts, addToCart, removeFromCart } = useContext(Context);
  const products = getProducts();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const filteredProducts = products.filter(
    (item) => item.Category.toLowerCase() == CategoryName
  );
  console.log(filteredProducts);
  return (
    <div>
      {filteredProducts.map((item) => (
        <div
          className="flex
        m-2  items-center "
        >
          <div
            className=" sm:flex sm:flex-row  flex-col gap-5 
            sm:justify-between sm:w-[400px] hover:scale-105 duration-300 w-[300px] p-2  "
          >
            <img className=" rounded   " src={item.image} alt={item.name} />
            <div className="mt-4">
              <h1 className="font-bold">{item.name}</h1>
              <p className="text-gray-500 whitespace-nowrap ">
                {" "}
                Category: {item.Category}
              </p>
              <p className="text-green-600 font-bold mt-1">
                Price: ${item.price}
              </p>
              <div className="flex gap-4 mt-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removeFromCart(item)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
