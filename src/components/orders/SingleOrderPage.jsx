import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { BACKEND_URL } from "../../constantVariables";
import OrdersHistoryPage from "./OrdersHistoryPage";

const SingleOrderPage = () => {
  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState();
  const params = useParams();
  console.log(params);
  if (orderId !== params.orderId) {
    setOrderId(params.orderId);
  }

  const fetchSingleOrderInfo = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`${BACKEND_URL}/orders/${orderId}`);
        console.log(response.data);
        setOrder(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchSingleOrderInfo();
  }, [orderId]);

  console.log(order);
  return (
    <div>
      <Navbar />
      <div className="order-page">
        <div className="order-box">
          <div className="order-header">Order id: {orderId && orderId}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
