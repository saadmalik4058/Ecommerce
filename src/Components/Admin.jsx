import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "./Context/Context";
import ProductsStore from "./Products/ProductsStore";

const Admin = () => {
  const ctx = useContext(Context);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = ctx.getLoggedInUserRole();
    setRole(userRole);
  }, [ctx]);

  if (role === "user") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <h1 className="text-red-600 text-2xl font-semibold mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          This is the Admin page. You do not have the required access.
        </p>
        <Link to="/Dashboard">
          <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition">
            Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="flex flex-col items-center gap-8 bg-gray-200 min-h-screen py-12 px-4">
        <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <ProductsStore />
        </div>

        <Link to={-1} className="mt-6">
          <button className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  return null;
};

export default Admin;
