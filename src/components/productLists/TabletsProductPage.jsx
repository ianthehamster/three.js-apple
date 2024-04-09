import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import axios from 'axios';
import { Grid } from '@mui/material';

import { BACKEND_URL } from '../../constantVariables';
import Navbar from '../Navbar';
// import ModelFlagshipLaptop from '../ModelFlagshipLaptop';
import ModelFlagshipLaptop from '../ModelFlagshipProduct';
import { useLocation } from 'react-router-dom';

const TabletsProductPage = () => {
  const [tablets, setTablets] = useState([]);
  const [modelState, setModelState] = useState('');
  const location = useLocation();
  const currentUrl = location.pathname; // returns /tabletsPage - current path
  const categoryName = currentUrl.replace(/Page$/, '').substring(1); //returns tablets as category name
  const params = { categoryName: categoryName };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`, { params }).then((response) => {
      setTablets(response.data);
      setModelState('tablet');
    });
  }, []);

  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/products?${categoryName}`).then((response) => {
  //   axios.get(`${BACKEND_URL}/products?${categoryName}`).then((response) => {
  //     setTablets(response.data);
  //     setModelState("tablet");
  //   });
  // }, []);

  console.log(tablets);
  return (
    <div>
      <div>
        <Navbar />
        <ModelFlagshipLaptop modelState={modelState} />
        <h2>Tablets</h2>
        <Grid container spacing={5}>
          {tablets.map((product) => (
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

export default TabletsProductPage;
