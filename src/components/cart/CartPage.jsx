import React from "react";
import CartItems from "./CartItems";
import Navbar from "../navbar/Navbar";
import "./Cart.css";
import { Stack, Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { getTotalCartPrice, getTotalCartItemsQty } = useContext(CartContext); // your context is really mighty. I am sure you realized how useful that context is across your app

  const total = formatCurrency(getTotalCartPrice());
  const cartItemsQuantity = getTotalCartItemsQty();
  return (
    <div>
      <Navbar />
      <div className="cart-wrapper">
        <div className="cart-header">Your cart:</div>

        <Stack spacing={2} className="cart-content">
          <div>
            <CartItems />
          </div>
          {!cartItemsQuantity && (
            <div>
              <img
                src="public/images/no-data.jpg"
                alt="Nothing here!"
                className="no-data-img"
              />
            </div>
          )}
        </Stack>
        <div className="cart-page-bottom">
          {cartItemsQuantity && (
            <div className="subtotal">
              <span className="subtotal-text">Subtotal: </span>
              <span className="total-value">{total}</span>
            </div>
          )}
          {cartItemsQuantity && (
            <div className="continue-btn">
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
