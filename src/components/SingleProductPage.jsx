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

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState();
  const [priceId, setPriceId] = useState("");
  const { cartItems, getCartItemQuantity, removeFromCart } =
    useContext(CartContext);

  console.log(cartItems);

  const getProductInfo = async () => {
    if (productId) {
      axios.get(`${BACKEND_URL}/products/${productId}`).then((response) => {
        setProduct(response.data);
        setPriceId(response.data.stripe_id);
        console.log(response, priceId);
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
  useEffect(() => {
    getProductInfo();
  }, []);

  // Update product ID in state if needed to trigger data retrieval
  const params = useParams();
  if (productId !== params.productId) {
    setProductId(params.productId);
  }
  const quantityInCart = getCartItemQuantity(product.id);
  const price = formatCurrency(product.price);

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/products/create-checkout-session`,
        {
          priceId: priceId,
        }
      );
      window.location.href = response.data.url;
    } catch (err) {
      console.error(`Error creating checkout session: ${err}`);
    }

    // Send a POST request to backend to create an order
    try {
    } catch (err) {}
  };

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
            {quantityInCart === 0 ? (
              <AddToCartButton product={product} />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
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
        {product && productDetails}
        <form onSubmit={handleCheckout}>
          <input type="hidden" name="priceId" value={priceId} />
          <button type="submit">Checkout</button>
        </form>
      </section>
    </div>
  );
};

export default SingleProductPage;
