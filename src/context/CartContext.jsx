import React from "react";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  // const [cartItems, setCartItems] = useState(getDefaultCart());
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [cartItems, setCartItems] = useState(storedCartItems);
  console.log(storedCartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const getTotalCartPrice = () => {
    let cartTotal = 0;
    let itemTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      itemTotal = item.price * item.quantity;
      cartTotal = cartTotal + itemTotal;
    }

    return cartTotal;
  };

  const getTotalCartItemsQty = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      total = total + item.quantity;
    }

    return total;
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
    getTotalCartPrice,
    getTotalCartItemsQty,
    checkout,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
