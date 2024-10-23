import React from "react";
import { Link } from "react-router-dom";

function EmptySearch() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <h1 className="text-red-600 text-2xl font-semibold mb-4">
        {/* Search Something..! */}
        Aby Saaly Search To Karle Kuch...!
          </h1>
      {/* <p className="text-gray-600 mb-6">aby sarch karle</p> */}
      <Link to="/Dashboard">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default EmptySearch;
