import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Navbar";
import { BACKEND_URL } from "../../constantVariables";
import axios from "axios";
import "./PaymentSuccessPage.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  console.log(isAuthenticated, user);

  // const getUserId = async function(){
  //   try{
  //     const user = await axios.get()
  //   }catch(err){
  //     console.error(err)
  //   }
  // }

  // useEffect(async () => {
  //   try{
  //     const postOrder = await axios.post()
  //   }catch(err){

  //   }

  //   return () => {
  //     second;
  //   };
  // }, []);

  const getUserId = async () => {
    await axios
      .put(`${BACKEND_URL}/users`, {
        name: user.name,
      })
      .then((response) => console.log(response));
  };

  useEffect(() => {
    getUserId();
  }, [user]);

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
