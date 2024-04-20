import React from "react";
import Navbar from "../navbar/Navbar";
import "./PaymentSuccessPage.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

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
        <p className="text">Your order has been posted successfully!</p>
        <p className="text">Thank you for shopping with us!</p>
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            bgcolor: "#42b883",
            "&:hover": {
              bgcolor: "#61b390",
            },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
