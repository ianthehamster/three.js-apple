import React from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
const IncrementDecrementBtn = (props) => {
  const { addToCart, getCartItemQuantity, decreaseQuantity } =
    useContext(CartContext);

  const quantityInCart = getCartItemQuantity(props.product.id);
  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        style={{ padding: "4px", minWidth: "24px" }}
        onClick={() => addToCart(props.product)}
      >
        +
      </Button>
      <span style={{ margin: "0 10px" }}>{quantityInCart} in cart</span>
      <Button
        variant="outlined"
        size="small"
        style={{ padding: "4px", minWidth: "24px" }}
        onClick={() => decreaseQuantity(props.product.id)}
      >
        -
      </Button>
    </div>
  );
};

export default IncrementDecrementBtn;
