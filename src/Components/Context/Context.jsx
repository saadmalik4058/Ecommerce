import React, { createContext } from "react";

const Context = createContext({
  setItem: () => {},
  getItem: () => {},
  getLoggedInUserRole: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  deleteFun: () => {},
});

export default Context;
