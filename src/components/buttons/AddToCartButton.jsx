import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const AddToCartButton = (props) => {
  const {
    addToCart,
    cartItems,
    getCartItemQuantity,
    removeFromCart,
    decreaseQuantity,
  } = useContext(CartContext);

  console.log(cartItems);

  const quantityInCart = getCartItemQuantity(props.product.id);
  return (
    <div>
      {quantityInCart === 0 ? (
        <Button
          size="small"
          disabled={!props.product.stock_left}
          onClick={() => addToCart(props.product)}
        >
          Add to cart
        </Button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <DeleteIcon
            style={{ margin: "auto 15px" }}
            onClick={() => removeFromCart(props.product.id)}
          />
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
