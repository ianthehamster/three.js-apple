import React, { useEffect, useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../Navbar';
import { BACKEND_URL } from '../../constantVariables';
import axios from 'axios';
import './PaymentSuccessPage.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const PaymentSuccessPage = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [userId, setUserId] = useState(null);
  const { user } = useAuth0();
  // const [productIdArray, setProductIdArray] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const {
    getDeliveryAddress,
    getTotalCartPrice,
    cartItems,
    getTotalCartItemsQty,
    checkout,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const getUserIdAndSetUserAddress = async () => {
    if (user) {
      await axios
        .put(`${BACKEND_URL}/users`, {
          name: user.name,
        })
        .then((response) => setUserId(response.data.id));
    }
    setUserAddress(getDeliveryAddress());

    if (userAddress) {
      try {
        await axios
          .get(`${BACKEND_URL}/addresses/get-address-id`, {
            params: {
              delivery_address: userAddress,
            },
          })
          .then((response) => setAddressId(response.data))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const setProductIdArrays = () => {
  //   if (cartItems) {
  //     setProductIdArray(cartItems.map((cartItem) => cartItem.id));
  //   }
  // };

  // const quantity = getTotalCartItemsQty();

  const subTotalPrice = getTotalCartPrice();

  const updateProductsArray = () => {
    if (cartItems) {
      setProductsArray(
        cartItems.map((cartItem) => ({
          [cartItem.id]: cartItem.quantity,
        })),
      );
    }
  };

  // Post order
  const postOrder = async () => {
    try {
      console.log('postOrder is called!');
      await axios
        .post(`${BACKEND_URL}/orders`, {
          address_id: addressId,
          user_id: userId,
          total_price: subTotalPrice,
          products: productsArray,
        })
        .then((response) => {
          console.log(response);
        });
      setOrderStatus(true);
      checkout();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserIdAndSetUserAddress();
  }, [user]);

  useEffect(() => {
    // setProductIdArrays();
    updateProductsArray();
  }, [cartItems]);

  useEffect(() => {
    if (
      orderStatus === false &&
      userId &&
      addressId &&
      cartItems.length !== 0
    ) {
      postOrder();
    }
  }, [userId, addressId]);

  console.log(cartItems.length);

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="payment-res-img">
          <img
            src="https://us.123rf.com/450wm/dstarky/dstarky1709/dstarky170900073/85568018-green-tick-flat-icon-in-circle-vector-illustration-isolated-on-a-white-background-acceptance-of.jpg?ver=6"
            alt="success"
          />
        </div>
        <p className="payment-result">Success!</p>
        <p className="text">Your payment has been processed successfully!</p>
        <p className="text">Thank you for shopping with us!</p>
        <Button
          variant="contained"
          sx={{
            marginTop: '20px',
            bgcolor: '#42b883',
            '&:hover': {
              bgcolor: '#61b390',
            },
          }}
          onClick={() => {
            navigate('/');
          }}
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
