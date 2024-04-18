import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constantVariables";
import axios from "axios";
import OrderCard from "./OrderCard";
import "ldrs/hourglass";

const OrdersHistoryPage = () => {
  const { user } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdersInfo = async () => {
    if (user && user.email) {
      try {
        const response = await axios.get(`${BACKEND_URL}/orders`, {
          params: {
            email: user.email,
          },
        });

        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
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
      <div className="orders-list">
        {loading ? (
          <div className="spinner">
            <l-hourglass size="40" color="black"></l-hourglass>
          </div>
        ) : (
          ordersList
        )}
      </div>

      <div className="no-data-img-container">
        {!orders.length && !loading && (
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
