import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartItem = () => {
  const {
    addToCart,
    cartItems,
    getCartItemQuantity,
    removeFromCart,
    decreaseQuantity,
  } = useContext(CartContext);

  console.log(cartItems);

  const cartItemsList =
    cartItems.length > 0 &&
    cartItems.map((item) => (
      <div key={item.id}>
        <p>
          {item.title} : {item.quantity} pcs.
        </p>
      </div>
    ));

  console.log(cartItemsList);
  return (
    <div>
      <h1>Your cart</h1>
      {cartItems.length > 0 && cartItemsList}
    </div>
  );
};

export default CartItem;
