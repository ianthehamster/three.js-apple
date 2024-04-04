import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Cart.css";
import IncrementDecrementBtn from "../buttons/IncrementDecrementBtn";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItems = () => {
  const { cartItems, getCartItemQuantity, removeFromCart } =
    useContext(CartContext);

  const cartItemsList =
    cartItems.length > 0 &&
    cartItems.map((item) => (
      <div key={item.id} className="item-container">
        <div className="name-price-container">
          <div className="name-img-container">
            <div className="cart-item-image">
              <img src={item.img} alt="product_img" />
            </div>

            <div className="item-name">{item.title}</div>
          </div>

          <div className="item-total-price">
            {formatCurrency(item.price * item.quantity)}
          </div>
        </div>
        <div className="buttons-container">
          <div className="cart-buttons">
            <IncrementDecrementBtn product={item} />
            <DeleteIcon onClick={() => removeFromCart(item.id)} />
          </div>
        </div>
      </div>
    ));

  return <div> {cartItems.length > 0 && cartItemsList}</div>;
};

export default CartItems;
