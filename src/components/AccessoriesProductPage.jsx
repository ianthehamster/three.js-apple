import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const AccessoriesProductPage = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((response) => {
      setAccessories(response.data);
    });
  }, []);
  return (
    <div>
      <div>
        <h2>Accessories</h2>
        <ul>
          {accessories.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccessoriesProductPage;
