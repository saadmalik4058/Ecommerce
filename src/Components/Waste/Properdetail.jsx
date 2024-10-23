import React from "react";
import { useParams } from "react-router-dom";

const Properdetail = () => {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products"));

  const matchIdProduct = products.find((p) => p?.id === id);
  const m = [matchIdProduct];

  return (
    <div>
      {m.map((item) => (
        <h1 key={item.id}>{item?.name}</h1>
      ))}
    </div>
  );
};

export default Properdetail;
