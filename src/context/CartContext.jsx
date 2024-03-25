import React from "react";

import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  // const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartItems, setCartItems] = useState([]);

  const getCartItemQuantity = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (item) => {
    const isItemNotInCart =
      cartItems.find((cartItem) => cartItem.id === item.id) === undefined;

    if (isItemNotInCart) {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    } else {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
  };

  const decreaseQuantity = (id) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === id);

    if (cartItem.quantity === 1) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    setCartItems(updatedCartItems);
  };

  const checkout = () => {
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    getCartItemQuantity,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    // getTotalCartAmount,
    checkout,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
