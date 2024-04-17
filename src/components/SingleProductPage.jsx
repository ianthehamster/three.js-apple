import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "./Navbar";
import { BACKEND_URL } from "../constantVariables";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Stack, Box } from "@mui/material";
import "./SingleProductPage.css";
import { formatCurrency } from "../utils/formatCurrency";
import AddToCartButton from "./buttons/AddToCartButton";
import IncrementDecrementBtn from "./buttons/IncrementDecrementBtn";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";
// Animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "ldrs/hourglass";
import ModelFlagshipLaptop from "./ModelFlagshipProduct";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [priceId, setPriceId] = useState("");
  const { getCartItemQuantity, removeFromCart } = useContext(CartContext);
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelState, setModelState] = useState("");

  const getToken = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope:
          "read:current_user update:current_user_metadata openid profile email read:user_metadata",
      });

      setAccessToken(token);
    }
  };

  const getProductInfo = async () => {
    if (productId) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProduct(response.data);
        setPriceId(response.data.stripe_id);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const showProductInfo = () => {
    if (accessToken) {
      getProductInfo();
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
    getToken();
  }, []);

  useEffect(() => {
    setLoading(true);
    showProductInfo();
  }, [accessToken, productId]);

  const params = useParams();
  if (productId !== params.productId) {
    setProductId(params.productId);
  }

  const quantityInCart = getCartItemQuantity(product.id);
  const price = formatCurrency(product.price);

  const productDetails = (
    <div>
      <Grid container sx={{ p: 2 }} display="flex">
        <Grid item xs={12} md={6} lg={6} className="product-image-container">
          <img
            id="product-image"
            src={product.img && product.img}
            alt="product_img"
            className="product-image"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} display="flex" alignItems="center">
          <Stack
            spacing={4}
            sx={{ p: 2, width: "100%" }}
            className="product-info-container"
          >
            <div className="product-title">
              {product.title && product.title}
            </div>
            <div className="product-description">
              {product.description && product.description}
            </div>

            <div
              style={{
                fontSize: "120%",
              }}
            >
              {product.price && price}
            </div>
            <div>In stock: {product.stock_left && product.stock_left}</div>

            {quantityInCart === 0 ? (
              <div>
                <AddToCartButton product={product} />
              </div>
            ) : (
              <div className="increment-btn">
                <IncrementDecrementBtn product={product} />
                <div>
                  <DeleteIcon
                    style={{ margin: "auto 15px" }}
                    onClick={() => removeFromCart(product.id)}
                  />
                </div>
              </div>
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );

  useEffect(() => {
    switch (product.title) {
      case "Alienware Laptop":
        setModelState("laptops");
        break;
      case "Pear IPhone X":
        setModelState("phones");
        break;
      case "Pear Vision Pro":
        setModelState("accessories");
        break;
      case "Cyberpunk Tablet":
        setModelState("tablets");
        break;
      default:
        setModelState("");
    }
  }, [product]);

  return (
    <div>
      {product.title === "Alienware Laptop" ||
      product.title === "Pear IPhone X" ||
      product.title === "Pear Vision Pro" ||
      product.title === "Cyberpunk Tablet" ? (
        <div>
          <Navbar />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ModelFlagshipLaptop modelState={modelState} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "block", margin: "auto" }}>
                <Stack
                  spacing={4}
                  sx={{ p: 2, width: "100%" }}
                  className="product-info-container"
                >
                  <div className="product-title" style={{ margin: "auto" }}>
                    {product.title && product.title}
                  </div>
                  <div
                    className="product-description"
                    style={{ margin: "20px auto" }}
                  >
                    {product.description && product.description}
                  </div>

                  <div
                    style={{
                      fontSize: "120%",
                      margin: "20px auto",
                    }}
                  >
                    {product.price && price}
                  </div>
                  <div style={{ margin: "20px auto" }}>
                    In stock: {product.stock_left && product.stock_left}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {quantityInCart === 0 ? (
                      <div style={{ margin: "20px auto" }}>
                        <AddToCartButton product={product} />
                      </div>
                    ) : (
                      <div className="increment-btn">
                        <IncrementDecrementBtn product={product} />
                        <div>
                          <DeleteIcon
                            style={{ margin: "auto 15px" }}
                            onClick={() => removeFromCart(product.id)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </div>
      ) : (
        <section>
          <Navbar />
          {loading ? (
            <div className="spinner">
              <l-hourglass size="40" color="black"></l-hourglass>
            </div>
          ) : (
            productDetails
          )}
        </section>
      )}
    </div>
  );
};

export default SingleProductPage;

// return (
//   <div>
//     <section>
//       <Navbar />
//       {loading ? (
//         <div className="spinner">
//           <l-hourglass size="40" color="black"></l-hourglass>
//         </div>
//       ) : (
//         productDetails
//       )}
//     </section>
//   </div>
// );
