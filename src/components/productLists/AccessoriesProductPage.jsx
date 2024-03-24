import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import axios from 'axios';
import { Grid } from '@mui/material';

import { BACKEND_URL } from '../../constantVariables';
import Navbar from '../Navbar';
import ModelFlagshipLaptop from '../ModelFlagshipLaptop';

const AccessoriesProductPage = () => {
  const [accessories, setAccessories] = useState([]);
  const [modelState, setModelState] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`).then((response) => {
      setAccessories(response.data);
      setModelState('accessories');
    });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <ModelFlagshipLaptop modelState={modelState} />
        <Grid container spacing={5}>
          {accessories.map((product) => (
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
                <ProductCard product={product} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default AccessoriesProductPage;
