import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import { Grid } from "@mui/material";
import Navbar from "../Navbar";
import { BACKEND_URL } from "../../constantVariables";
import ModelFlagshipLaptop from "../ModelFlagshipProduct";

const ProductsPage = () => {
  const { categoryName } = useParams();
  const [accessories, setAccessories] = useState([]);
  const [modelState, setModelState] = useState("");
  const params = { categoryName: categoryName };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`, { params }).then((response) => {
      setAccessories(response.data);
      setModelState(categoryName);
    });
  }, [categoryName]);

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

export default ProductsPage;
