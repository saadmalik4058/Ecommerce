import React, { useEffect, useState } from "react";
import Context from "./Context";

function MyProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("token");
  });
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedProducts);
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  function setItem(data) {
    const existingData = localStorage.getItem("signup");
    const dataArr = existingData ? JSON.parse(existingData) : [];

    const existingUser = dataArr.find((user) => user.email === data.email);

    if (!existingUser) {
      dataArr.push(data);
      localStorage.setItem("signup", JSON.stringify(dataArr));
      alert("User successfully registered!");
    } else {
      alert("User already registered");
    }
  }

  function getItem(data, token) {
    const storedData = localStorage.getItem("signup");
    const dataArr = storedData ? JSON.parse(storedData) : [];

    const user = dataArr.find(
      (user) => user.email === data.email && user.password === data.password
    );
    localStorage.setItem("token", JSON.stringify(token));
    setIsAuthenticated(true);
    return user;
  }
  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }
  function getLoggedInUserRole() {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return null;

    const data = localStorage.getItem("signup");
    const dataArr = data ? JSON.parse(data) : [];
    const user = dataArr.find((user) => user.email == userEmail);
    return user ? user.role : null;
  }
  function addToCart(item) {
    const productsCart = [...cart];
    const existingProduct = productsCart.find(
      (product) => product.id == item.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      productsCart.push({ ...item, quantity: 1 });
    }
    setCart(productsCart);
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }

  function removeFromCart(item) {
    let storedProducts = [...cart];
    const existingProduct = storedProducts.find(
      (product) => item.id === product.id
    );
    if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
    } else {
      storedProducts = storedProducts.filter(
        (product) => item.id !== product.id
      );
      setCart(storedProducts);

      return;
    }
    setCart(storedProducts);
    localStorage.setItem("cart", JSON.stringify(storedProducts));
  }
  function getProducts() {
    return JSON.parse(localStorage.getItem("products"));
  }

  const data = {
    setItem,
    getItem,
    getLoggedInUserRole,
    addToCart,
    removeFromCart,
    cart,
    logout,
    isAuthenticated,
    getProducts,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
}

export default MyProvider;
