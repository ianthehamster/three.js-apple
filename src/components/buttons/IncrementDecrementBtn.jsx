import React from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
const IncrementDecrementBtn = (props) => { // I don't see a single button, but two buttons. Also, why spell it Btn here, but spell it out in other components?
  const { addToCart, getCartItemQuantity, decreaseQuantity } =
    useContext(CartContext);

  const quantityInCart = getCartItemQuantity(props.product.id);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="outlined"
        size="small"
        style={{ padding: "4px", minWidth: "24px" }}
        onClick={() => addToCart(props.product)}
      >
        +
      </Button>
      <span style={{ margin: "0 10px" }}>{quantityInCart} </span>
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
