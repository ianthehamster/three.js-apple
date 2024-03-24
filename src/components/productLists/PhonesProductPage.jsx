import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import { Grid } from "@mui/material";
import Navbar from "../Navbar";

import { BACKEND_URL } from "../../constantVariables";
const PhonesProductPage = () => {
  const [phones, setPhones] = useState([]);
  // user is redirected to this page after clicking on a category

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`).then((response) => {
      console.log(response);
      setPhones(response.data);
      console.log(phones);
    });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
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
