import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard';
import { Grid } from '@mui/material';
import Navbar from '../Navbar';

import { BACKEND_URL } from '../../constantVariables';
import ModelFlagshipLaptop from '../ModelFlagshipProduct';
const PhonesProductPage = () => {
  const [phones, setPhones] = useState([]);
  const [modelState, setModelState] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`).then((response) => {
      setPhones(response.data);
      setModelState('phones');
    });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <ModelFlagshipLaptop modelState={modelState} />
        <Grid container spacing={5}>
          {phones.map((product) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={product.id}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <div key={product.id}>
                {console.log(product)}
                <ProductCard product={product} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PhonesProductPage;
