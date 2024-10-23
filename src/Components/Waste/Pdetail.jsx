import React from "react";
import { Link } from "react-router-dom";

const Pdetail = () => {
  const products = JSON.parse(localStorage.getItem("products"));

  return (
    <div>
      {products.map((item) => (
        <Link key={item?.id} to={`/Dashboard/p/${item?.id}`}>
          <h1>{item?.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Pdetail;
