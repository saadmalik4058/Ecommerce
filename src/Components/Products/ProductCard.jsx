// ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div>
      <img src={product.image} alt={product.name} />
      {/* <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${parseFloat(product.price).toFixed(2)}</h3> */}
    </div>
  );
};

export default ProductCard;
