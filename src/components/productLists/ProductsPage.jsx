import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import { Button, Grid } from "@mui/material";
import Navbar from "../Navbar";
import { BACKEND_URL } from "../../constantVariables";
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
  const handleLearnClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  console.log(`Model State is: ${modelState}`);

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
          {modelState === "laptops" && isAuthenticated ? (
            <Button
              variant="contained"
              sx={{ marginBottom: "50px", marginTop: 0 }}
              onClick={() => handleLearnClick(38)}
            >
              Buy
            </Button>
          ) : modelState === "phones" && isAuthenticated ? (
            <Button
              variant="contained"
              sx={{ marginBottom: "50px", marginTop: 0 }}
              onClick={() => handleLearnClick(39)}
            >
              Buy
            </Button>
          ) : modelState === "accessories" && isAuthenticated ? (
            <Button
              variant="contained"
              sx={{ marginBottom: "50px", marginTop: 0 }}
              onClick={() => handleLearnClick(40)}
            >
              Buy
            </Button>
          ) : modelState === "tablets" && isAuthenticated ? (
            <Button
              variant="contained"
              sx={{ marginBottom: "50px", marginTop: 0 }}
              onClick={() => handleLearnClick(41)}
            >
              Buy
            </Button>
          ) : null}
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
