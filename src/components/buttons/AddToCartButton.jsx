import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const AddToCartButton = (props) => {
  return (
    <div>
      {props.quantityInCart === 0 ? (
        <Button size="small">Add to cart</Button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="outlined"
            size="small"
            style={{ padding: "4px", minWidth: "24px" }}
          >
            +
          </Button>

          <span style={{ margin: "0 10px" }}>
            {props.quantityInCart} in cart
          </span>

          <Button
            variant="outlined"
            size="small"
            style={{ padding: "4px", minWidth: "24px" }}
          >
            -
          </Button>
          <DeleteIcon style={{ margin: "auto 15px" }} />
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
