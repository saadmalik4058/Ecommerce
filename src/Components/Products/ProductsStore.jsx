import React, { useEffect, useState } from "react";
import Addproducts from "./Addproducts";

const ProductsStore = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedProductsInCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedProductsInCart);
    setProducts(storedProducts);
  }, []);

  function handleAddProduct(newProduct, editMode) {
    if (editMode) {
      const updatedProducts = products.map((product) =>
        product.id === editProduct.id
          ? { ...newProduct, id: product.id }
          : product
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setEditProduct(null);

      const updatedCart = cart.map((cartProduct) =>
        cartProduct.id === editProduct.id
          ? { ...newProduct, id: cartProduct.id }
          : cartProduct
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setEditProduct(null);
    } else {
      const productWithId = {
        ...newProduct,
        id: Math.random().toString(36),
      };
      const updatedProducts = [...products, productWithId];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  }

  function deleteFun(id) {
    const updatedCart = cart.filter(
      (products) => products?.id !== id?.toString()
    );
    const updatedProducts = products.filter(
      (products) => products?.id !== id?.toString()
    );
    setProducts(updatedProducts);
    setCart(updatedCart);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  }
  function handleEdit(product) {
    setEditProduct(product);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <Addproducts onAdd={handleAddProduct} editProduct={editProduct} />

      {products.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Products List:
          </h3>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product?.id}
                className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {product?.name}
                  </h4>
                  <p className="text-gray-600">{product?.description}</p>
                  <p className="text-green-500 font-semibold mt-1">
                    Price: ${parseFloat(product?.price).toFixed(2)}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => deleteFun(product?.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <img
                  src={product?.image || "fallback-image-url.jpg"}
                  alt={product?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductsStore;
