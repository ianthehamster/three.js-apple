import React from "react";
import CartItem from "./CartItem";
import Navbar from "../Navbar";
import "./Cart.css";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <div className="cart-wrapper">
        <h1>Your cart</h1>
        <div>
          <CartItem />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
