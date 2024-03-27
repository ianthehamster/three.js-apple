import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Cart.css";
import IncrementDecrementBtn from "../buttons/IncrementDecrementBtn";

const CartItem = () => {
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
        <div>{item.title}</div>
        {/* <div>{item.quantity} pcs</div> */}
        <div>{formatCurrency(item.price)}</div>
        <div>{formatCurrency(item.price * item.quantity)}</div>
        <IncrementDecrementBtn product={item} />
      </div>
    ));

  return <div> {cartItems.length > 0 && cartItemsList}</div>;
};

export default CartItem;
