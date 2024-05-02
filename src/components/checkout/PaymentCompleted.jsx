import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constantVariables";
import axios from "axios";
import "./PaymentSuccessPage.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useEffect, useContext, useState } from "react";
import ErrorPage from "../errorPopup/ErrorPage";
import "ldrs/hourglass";
import PaymentSuccessPage from "./PaymentSuccessPage";

const PaymentCompleted = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [userId, setUserId] = useState(null);
  const { user } = useAuth0(); // i barely see any protection via auth0 on any of your pages. We should make sure to protect our pages appropriately and redirect users if necessary
  const [orderStatus, setOrderStatus] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const { getDeliveryAddress, getTotalCartPrice, cartItems, checkout } =
    useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getUserId = async () => {
    if (user && user.email) {
      try {
        const response = await axios.put(`${BACKEND_URL}/users`, {
          email: user.email,
        });
        setUserId(response.data.id);
      } catch (err) {
        setErrorMessage("Please contact the developer at developer@gmail.com");
        console.error(err);
      }
    }
  };

  const getAddressId = async () => {
    setUserAddress(getDeliveryAddress());
    if (userAddress) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/addresses/get-address-id`,
          {
            params: {
              delivery_address: userAddress,
            },
          }
        );
        setAddressId(response.data);
      } catch (err) {
        setErrorMessage("Please contact the developer at developer@gmail.com");
        console.log(err);
      }
    }
  };

  const subTotalPrice = getTotalCartPrice();

  const updateProductsArray = () => {
    if (cartItems) {
      setProductsArray(
        cartItems.map((cartItem) => ({
          [cartItem.id]: cartItem.quantity,
        }))
      );
    }
  };

  const postOrder = async () => {
    if (userId && addressId && cartItems.length) {
      try {
        const response = await axios.post(`${BACKEND_URL}/orders`, {
          address_id: addressId,
          user_id: userId,
          total_price: subTotalPrice,
          products: productsArray,
        });
        setOrderStatus(true);
        checkout();
      } catch (err) {
        setErrorMessage("Please contact the developer at developer@gmail.com");
        console.log(err);
      }
    }
  };

  // so many effects. Please give them named functions in order to have a better insight as to what they are for.
  useEffect(() => {
    getUserId();
    getAddressId();
  }, [user]);

  useEffect(() => {
    updateProductsArray();
  }, [cartItems]);

  useEffect(() => {
    if (orderStatus === false) {
      postOrder();
    }
  }, [userId, addressId]);

  const handleErrorMessage = () => {
    setErrorMessage("");
    navigate("/");
  };

  return (
    <div>
      {!orderStatus && errorMessage === "" && (
        <div className="spinner">
          <l-hourglass size="40" color="black"></l-hourglass>
        </div>
      )}
      <ErrorPage
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
      />
      {orderStatus && errorMessage === "" && <PaymentSuccessPage />}
    </div>
  );
};

export default PaymentCompleted;
