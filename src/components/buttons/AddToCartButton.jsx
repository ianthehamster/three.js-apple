import React from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const AddToCartButton = (props) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <Button
        size="small"
        disabled={!props.product.stock_left}
        onClick={() => addToCart(props.product)}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
