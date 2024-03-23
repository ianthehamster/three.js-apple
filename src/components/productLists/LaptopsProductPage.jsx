import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { Grid } from "@mui/material";

const LaptopsProductPage = () => {
  const [laptops, setLaptops] = useState([]);

  // Seed Laptops and also alter products table to add columns and categories so that only products of category laptop is fetched here
  useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((response) => {
      console.log(response);
      setLaptops(response.data);
      console.log(laptops);
    });
  }, []);

  // Just do one three js product here as the flagship product - not enough time to do for all products

  return (
    <div>
      <div>
        <h2>Laptops</h2>

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

export default LaptopsProductPage;
