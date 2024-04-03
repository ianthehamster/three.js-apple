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
  const { getTotalCartPrice } = useContext(CartContext);

  const total = formatCurrency(getTotalCartPrice());
  return (
    <div>
      <Navbar />
      <div className="cart-wrapper">
        <Stack spacing={2} className="cart-content">
          <div className="cart-header">Your cart</div>
          <div>
            <CartItems />
          </div>
          <div className="subtotal">
            <span className="subtotal-text">Subtotal:</span> {total}
          </div>
          <div className="continue-btn">
            <Button
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Continue
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default CartPage;
