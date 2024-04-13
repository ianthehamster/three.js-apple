import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constantVariables";
import axios from "axios";
import OrderCard from "./OrderCard";

const OrdersHistoryPage = () => {
  const { user } = useAuth0();
  const [orders, setOrders] = useState([]);

  const fetchOrdersInfo = async () => {
    if (user && user.email) {
      try {
        const response = await axios.get(`${BACKEND_URL}/orders`, {
          params: {
            email: user.email,
          },
        });

        setOrders(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    fetchOrdersInfo();
  }, [user]);

  const ordersList =
    orders.length > 0 &&
    orders.map((order) => (
      <div key={order.id}>
        <OrderCard order={order} />
      </div>
    ));

  return (
    <div className="orders-page">
      <Navbar />
      <div className="header">Your orders:</div>
      <div className="orders-list">{ordersList}</div>
      <div className="no-data-img-container">
        {!orders.length && (
          <img
            src="public/images/no-data.jpg"
            alt="Nothing here"
            className="no-data-img"
          />
        )}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
