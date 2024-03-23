import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { Grid } from "@mui/material";
import { BACKEND_URL } from "../../constants";

const TabletsProductPage = () => {
  const [tablets, setTablets] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`).then((response) => {
      console.log(response);
      setTablets(response.data);
      console.log(tablets);
    });
  }, []);

  return (
    <div>
      <div>
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

export default TabletsProductPage;
