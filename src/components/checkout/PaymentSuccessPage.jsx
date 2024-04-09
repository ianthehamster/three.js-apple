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
  const { user, isAuthenticated } = useAuth0();
  const [productIdArray, setProductIdArray] = useState([]);
  const { getDeliveryAddress, getTotalCartPrice, cartItems } =
    useContext(CartContext);

  const navigate = useNavigate();

  // console.log(isAuthenticated, user);
  console.log(cartItems);

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
          .post(`http://localhost:3000/addresses/get-address-id`, {
            delivery_address: userAddress,
          })
          .then((response) => setAddressId(response.data))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const setProductIdArrays = () => {
    if (cartItems) {
      setProductIdArray(cartItems.map((cartItem) => cartItem.id));
    }
  };

  useEffect(() => {
    getUserIdAndSetUserAddress();
  }, [user]);

  useEffect(() => {
    setProductIdArrays();
  }, [cartItems]);

  const subTotalPrice = getTotalCartPrice();

  console.log(userAddress, addressId, userId, subTotalPrice, productIdArray);

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="success-img">
          <img
            src="https://us.123rf.com/450wm/dstarky/dstarky1709/dstarky170900073/85568018-green-tick-flat-icon-in-circle-vector-illustration-isolated-on-a-white-background-acceptance-of.jpg?ver=6"
            alt="success"
          />
        </div>
        <p className="success-header">Success!</p>
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
