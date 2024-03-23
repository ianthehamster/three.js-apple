import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { Grid } from "@mui/material";
import { BACKEND_URL } from "../../constants";

const AccessoriesProductPage = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`).then((response) => {
      setAccessories(response.data);
    });
  }, []);
  return (
    <div>
      <div>
        <h2>Accessories</h2>
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

export default AccessoriesProductPage;
