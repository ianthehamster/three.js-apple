import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import axios from 'axios';
import { Grid } from '@mui/material';
import Navbar from '../Navbar';
import { BACKEND_URL } from '../../constantVariables';
import ModelFlagshipLaptop from '../ModelFlagshipProduct';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LaptopsProductPage = () => {
  const [laptops, setLaptops] = useState([]);
  const [modelState, setModelState] = useState('');

  // Seed Laptops and also alter products table to add columns and categories so that only products of category laptop is fetched here
  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`).then((response) => {
      setLaptops(response.data);
      setModelState('laptop');
    });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <ModelFlagshipLaptop modelState={modelState} />

        <Grid container spacing={5}>
          {laptops.map((product) => (
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

export default LaptopsProductPage;