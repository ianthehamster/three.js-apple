import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Button, Grid } from "@mui/material";
import Navbar from "../navbar/Navbar";
import {
  BACKEND_URL,
  TABLETS,
  LAPTOPS,
  PHONES,
  ACCESSORIES,
} from "../../constantVariables";
import ModelFlagshipLaptop from "../ModelFlagshipProduct";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProductsPage = () => {
  const { categoryName } = useParams();
  const [accessories, setAccessories] = useState([]);
  const [modelState, setModelState] = useState("");
  const params = { categoryName: categoryName };
  const theme = useTheme();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/products`, { params }).then((response) => {
      setAccessories(response.data);
      setModelState(categoryName);
    });
  }, [categoryName]);

  const navigate = useNavigate();

  const handleClick = () => {
    let productId;
    if (modelState === LAPTOPS) {
      productId = 38;
    }
    if (modelState === PHONES) {
      productId = 39;
    }
    if (modelState === ACCESSORIES) {
      productId = 40;
    }
    if (modelState === TABLETS) {
      productId = 41;
    }
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <div>
        <Navbar />
        <ModelFlagshipLaptop modelState={modelState} />
        <div
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isAuthenticated && modelState !== "" && (
            <Button
              variant="contained"
              sx={{ marginBottom: "50px", marginTop: 0 }}
              onClick={handleClick}
            >
              Buy
            </Button>
          )}
        </div>
        <Grid
          container
          spacing={4}
          sx={{
            [theme.breakpoints.up("lg")]: {
              paddingLeft: 5,
              paddingRight: 5,
            },
          }}
        >
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
