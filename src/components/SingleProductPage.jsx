import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BACKEND_URL } from "../constantVariables";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Stack, Container, Typography } from "@mui/material";
import "./SingleProductPage.css";
import { formatCurrency } from "../utils/formatCurrency";
import AddToCartButton from "./buttons/AddToCartButton";

// Animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState();

  const getProductInfo = async () => {
    if (productId) {
      axios.get(`${BACKEND_URL}/products/${productId}`).then((response) => {
        setProduct(response.data);
        console.log(response.data);
        console.log(product);
      });
    }
  };

  // Animations
  useGSAP(() => {
    gsap.to("#test-title", {
      opacity: 1,
      y: -20,
      delay: 2,
    });
  });

  useEffect(() => {
    getProductInfo();
  }, [productId]);

  // Update product ID in state if needed to trigger data retrieval
  const params = useParams();
  if (productId !== params.productId) {
    setProductId(params.productId);
  }

  const price = formatCurrency(product.price);

  // Store a new JSX element for each property in product details
  // const productDetails = [];
  // if (product) {
  //   for (const key in product) {
  //     productDetails.push(<p key={key}>{`${key}: ${product[key]}`}</p>);
  //   }
  // }

  const quantityInCart = 0;

  const productDetails = (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} display="flex" justifyContent="center">
          <div className="image">
            <img src={product.img} alt="product_img" />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          display="flex"
          // justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2}>
            <div className="header">{product.title && product.title}</div>
            <div className="price">{product.price && price}</div>
            <div className="text">
              {product.description && product.description}
            </div>

            <div className="in-stock">
              In stock: {product.stock_left && product.stock_left}
            </div>
            <AddToCartButton product={product} />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Navbar />
      {product && productDetails}
    </div>
  );
};

export default SingleProductPage;
