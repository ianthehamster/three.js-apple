import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const TabletsProductPage = () => {
  const [tablets, setTablets] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((response) => {
      console.log(response);
      setTablets(response.data);
      console.log(tablets);
    });
  }, []);

  return (
    <div>
      <div>
        <h2>Tablets</h2>
        <ul>
          {tablets.map((product) => (
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

export default TabletsProductPage;
