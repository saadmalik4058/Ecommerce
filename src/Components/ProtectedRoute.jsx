import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "./Context/Context";

function ProtectedRoute({ children }) {
  // const isAuthenticated = !!localStorage.getItem("token");  // !! convert into boolean....    yeh krskty hain agr myprovider me authenticated ki default value false rkhi hai
  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
