import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import { Grid } from "@mui/material";
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
        {/* <ul> */}

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
        {/* </ul> */}
      </div>
    </div>
  );
};

export default PhonesProductPage;
