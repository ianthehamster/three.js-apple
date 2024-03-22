import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const PhonesProductPage = () => {
  const [phones, setPhones] = useState([]);
  // user is redirected to this page after clicking on a category

  useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((response) => {
      console.log(response);
      setPhones(response.data);
      console.log(phones);
    });
  }, []);

  return (
    <div>
      <div>
        <h2>Phones</h2>
        <ul>
          {phones.map((product) => (
            <li key={product.id}>
              {console.log(product)}
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhonesProductPage;
