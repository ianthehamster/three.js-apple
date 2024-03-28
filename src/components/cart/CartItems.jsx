import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Cart.css";
import IncrementDecrementBtn from "../buttons/IncrementDecrementBtn";
import { Grid, Divider } from "@mui/material";

const CartItems = () => {
  const {
    addToCart,
    cartItems,
    getCartItemQuantity,
    removeFromCart,
    decreaseQuantity,
  } = useContext(CartContext);

  const cartItemsList =
    cartItems.length > 0 &&
    cartItems.map((item) => (
      <div key={item.id} className="item-container">
        <Grid container spacing={6} className="grid">
          <Grid item xs={4}>
            <div>{item.title}</div>
          </Grid>

          <Grid item xs={4}>
            <IncrementDecrementBtn product={item} />
          </Grid>
          <Grid item xs={2}>
            {formatCurrency(item.price)}
          </Grid>
          <Grid item xs={2}>
            {formatCurrency(item.price * item.quantity)}
          </Grid>
        </Grid>
      </div>
    ));

  return <div> {cartItems.length > 0 && cartItemsList}</div>;
};

export default CartItems;
