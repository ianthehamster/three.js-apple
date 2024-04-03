import React from "react";
import CartItems from "./CartItems";
import Navbar from "../Navbar";
import "./Cart.css";
import { Stack, Button, Box } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { getTotalCartPrice, getTotalCartItemsQty } = useContext(CartContext);

  const total = formatCurrency(getTotalCartPrice());
  const cartItemsQuantity = getTotalCartItemsQty();
  return (
    <div>
      <Navbar />
      <div className="cart-wrapper">
        <Stack spacing={2} className="cart-content">
          {cartItemsQuantity ? (
            <div className="cart-header">Your cart</div>
          ) : (
            <div>Your cart is empty!</div>
          )}
          <div>
            <CartItems />
          </div>
          {cartItemsQuantity > 0 && (
            <div className="subtotal">
              <span className="subtotal-text">Subtotal:</span> {total}
            </div>
          )}
          {cartItemsQuantity ? (
            <div className="continue-btn">
              <Button
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div>
              <img
                src="public/cart-img/Animation - 1712157952636.gif"
                alt="nothing"
              />
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default CartPage;
