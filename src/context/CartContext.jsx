import React from "react";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const storedDeliveryAddress =
    JSON.parse(localStorage.getItem("deliveryAddress")) || [];

  const [cartItems, setCartItems] = useState(storedCartItems);
  const [deliveryAddress, setDeliveryAddress] = useState(storedDeliveryAddress);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));
  }, [deliveryAddress]);

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
    const totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return totalPrice;
  };

  const getTotalCartItemsQty = () => {
    const totalItemsQty = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    return totalItemsQty;
  };

  const checkout = () => {
    setCartItems([]);
  };

  const updateDeliveryAddress = (address) => {
    setDeliveryAddress(address);
    localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));

    return;
  };

  const getDeliveryAddress = () => {
    return deliveryAddress;
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
    updateDeliveryAddress,
    getDeliveryAddress,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
