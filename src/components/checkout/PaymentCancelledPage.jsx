import React from "react";
import Navbar from "../navbar/Navbar";
import { Button } from "@mui/material";
import "./PaymentSuccessPage.css";
import { useNavigate } from "react-router-dom";
const PaymentCancelledPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="payment-res-img">
          <img
            src="https://t4.ftcdn.net/jpg/02/41/15/39/360_F_241153907_v8pW0ZUXQ2NT96P2EnverQtaD11IDb2y.jpg"
            alt="cancelled"
          />
        </div>
        <p className="payment-result">Payment cancelled!</p>
        <p className="text">We are sad that you had to cancel your payment!</p>

        <p className="text">We hope you will be back with us soon!</p>
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            bgcolor: "#EE4B2B",
            "&:hover": {
              bgcolor: "#E97451",
            },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Go shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentCancelledPage;
