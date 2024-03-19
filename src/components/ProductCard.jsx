import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {/* Add more product details as needed */}
    </div>
  );
};

export default ProductCard;
