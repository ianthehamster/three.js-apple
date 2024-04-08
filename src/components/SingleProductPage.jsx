import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "./Navbar";
import { BACKEND_URL } from "../constantVariables";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Stack } from "@mui/material";
import "./SingleProductPage.css";
import { formatCurrency } from "../utils/formatCurrency";
import AddToCartButton from "./buttons/AddToCartButton";
import IncrementDecrementBtn from "./buttons/IncrementDecrementBtn";
import DeleteIcon from "@mui/icons-material/Delete";
// Animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth0 } from "@auth0/auth0-react";
// import CircularProgress from "@mui/material/CircularProgress";
import "ldrs/hourglass";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [priceId, setPriceId] = useState("");
  const { getCartItemQuantity, removeFromCart } = useContext(CartContext);
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Update product ID in state if needed to trigger data retrieval
  const params = useParams();
  console.log(params);
  if (productId !== params.productId) {
    setProductId(params.productId);
  }

  const quantityInCart = getCartItemQuantity(product.id);
  const price = formatCurrency(product.price);

  // const handleCheckout = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       `${BACKEND_URL}/products/create-checkout-session`,
  //       {
  //         priceId: priceId,
  //       }
  //     );
  //     window.location.href = response.data.url;
  //   } catch (err) {
  //     console.error(`Error creating checkout session: ${err}`);
  //   }

  //   // Send a POST request to backend to create an order
  //   try {
  //   } catch (err) {}
  // };

  const productDetails = (
    <div>
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12} md={6} lg={6} display="flex" justifyContent="center">
          <div className="image">
            <img
              id="product-image"
              src={product.img && product.img}
              alt="product_img"
            />
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
          <Stack spacing={2} sx={{ p: 2 }}>
            <div className="header">{product.title && product.title}</div>
            <div className="price">{product.price && price}</div>
            <div className="product-info">
              {product.description && product.description}
            </div>

            <div className="in-stock">
              In stock: {product.stock_left && product.stock_left}
            </div>
            {quantityInCart === 0 ? (
              <AddToCartButton product={product} />
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

  return (
    <div>
      <section>
        <Navbar />
        {loading ? (
          <div className="spinner">
            <l-hourglass size="60" color="coral"></l-hourglass>
          </div>
        ) : (
          productDetails
        )}
      </section>
    </div>
  );
};

export default SingleProductPage;
