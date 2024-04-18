import React, { useState, useMemo, useContext, useCallback } from "react";
import Navbar from "../navbar/Navbar";
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import { CartContext } from "../../context/CartContext";
import Select from "react-select";
import countryList from "react-select-country-list";
import { momentum } from "ldrs";
import axios from "axios";
import { BACKEND_URL } from "../../constantVariables";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorPage from "../errorPopup/ErrorPage";

momentum.register();

const CheckoutPage = () => {
  const [countryValue, setCountryValue] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    country: "",
    postcode: "",
    phoneNumber: "",
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const { cartItems, updateDeliveryAddress } = useContext(CartContext);

  const [shippingInfoState, setShippingInfoState] = useState(true);
  const [loaderSpinner, setLoaderSpinner] = useState(false);
  const [shippingMethodState, setShippingMethodState] = useState(true);
  const [loaderSpinnerMethod, setLoaderSpinnerMethod] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth0();
  const isSmallScreen = window.innerWidth <= 640;

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (e) => {
    const value = e.label;
    setCountryValue(value);
  };

  const handleYourDetails = async (e) => {
    const itemNames = cartItems.map((cartItem) => cartItem.title);

    const isFormFilledOut = Object.values(formData).every(
      (value) => value !== ""
    );
    if (!isFormFilledOut) {
      setErrorMessage("Please fill out your shipping details 😉 ");
      return;
    }

    if (!Number(formData.postcode)) {
      setErrorMessage("Post code must be a number!");
      return;
    }

    if (!Number(formData.phoneNumber)) {
      setErrorMessage("Your phone must be a number!");
      return;
    }

    if (isFormFilledOut && !errorMessage) {
      try {
        const response = await axios.post(`${BACKEND_URL}/addresses`, {
          email: user.email,
          address: formData.addressLine1,
        });
      } catch (error) {
        console.error(error.message);
      }

      updateDeliveryAddress(formData.addressLine1);

      setLoaderSpinner(true);
      setTimeout(() => {
        setShippingInfoState(false);
      }, 2000);
    }
  };

  const handleYourShippingMethod = (e) => {
    setLoaderSpinnerMethod(true);
    setTimeout(() => {
      setShippingMethodState(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { id } = e.target;
    let { value } = e.target;

    if (id === "phoneNumber" || id === "postcode") {
      value = Number(value);
    }

    setFormData({
      //...formData creates a shallow copy of an object and old id and value is overwritten with new id and value
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const priceIdsOfItems = cartItems.map((cartItem) => ({
      priceId: cartItem.stripe_id,
      quantity: cartItem.quantity,
    }));

    const itemNames = cartItems.map((cartItem) => cartItem.title);

    // Sending customer to Stripe-hosted checkout page
    try {
      const response = await axios.post(
        `${BACKEND_URL}/products/create-checkout-session-external`,
        {
          priceIds: priceIdsOfItems,
          userFirstName: user.first_name,
          userLastName: user.last_name,
          userEmail: user.email,
          itemNames: itemNames,
        }
      );
      window.location.href = response.data.url;
    } catch (err) {
      console.error(`Error creating checkout session: ${err}`);
    }
    try {
    } catch (err) {}
  };

  const initialValue = 0;
  const subTotal = cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.price) * currentValue.quantity,
    initialValue
  );
  const handleErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div>
      <Navbar />

      <ErrorPage
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ margin: "20px", marginTop: "50px" }}>
          Secure Checkout
        </Typography>
      </Box>
      <Box
        className="block md:flex"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "20px",
            width: "70%",
            padding: 3,
            border: "1px solid grey",
            borderRadius: 1,
          }}
        >
          {shippingInfoState ? (
            <Box sx={{ margin: "20px" }}>
              <Typography variant="h6" sx={{ marginBottom: "12px" }}>
                Your Details
              </Typography>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <TextField
                fullWidth
                id="email"
                variant="outlined"
                required
                onChange={handleInputChange}
                sx={{ marginBottom: "25px" }}
              />
              <Typography variant="h6" sx={{ marginBottom: "12px" }}>
                Shipping Information
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "50%", marginRight: "10px" }}>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <TextField
                    fullWidth
                    id="firstName"
                    variant="outlined"
                    required
                    onChange={handleInputChange}
                    sx={{ marginBottom: "25px" }}
                  />
                </Box>
                <Box sx={{ width: "50%", marginLeft: "10px" }}>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <TextField
                    fullWidth
                    id="lastName"
                    variant="outlined"
                    required
                    onChange={handleInputChange}
                    sx={{ marginBottom: "25px" }}
                  />
                </Box>
              </Box>
              <InputLabel htmlFor="addressLine1">Address Line 1</InputLabel>
              <TextField
                fullWidth
                id="addressLine1"
                variant="outlined"
                required
                onChange={handleInputChange}
                sx={{ marginBottom: "25px" }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "50%", marginRight: "10px" }}>
                  <InputLabel htmlFor="country">Country</InputLabel>
                  <TextField
                    fullWidth
                    id="country"
                    variant="outlined"
                    required
                    onChange={handleInputChange}
                    sx={{ marginBottom: "25px" }}
                  />
                </Box>
                <Box sx={{ width: "50%", marginRight: "10px" }}>
                  <InputLabel htmlFor="postcode">Postcode</InputLabel>
                  <TextField
                    fullWidth
                    id="postcode"
                    variant="outlined"
                    required
                    onChange={handleInputChange}
                    sx={{ marginBottom: "25px" }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "35%", marginRight: "10px" }}>
                  <InputLabel htmlFor="country-code">Phone Number</InputLabel>

                  <Select
                    options={options}
                    countryValue={countryValue}
                    onChange={changeHandler}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: "56px", // Adjust the height as needed
                      }),
                    }}
                  />
                </Box>
                <Box sx={{ width: "65%", marginRight: "10px" }}>
                  <InputLabel htmlFor="phoneNumber">‎</InputLabel>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    variant="outlined"
                    required
                    onChange={handleInputChange}
                    sx={{ marginBottom: "25px" }}
                  />
                </Box>
              </Box>
              <Box sx={{ marginTop: "25px" }}>
                <Typography variant="p" sx={{ fontSize: "15px" }}>
                  By providing your email, you agree to receive emails relating
                  to your order. Reply STOP to opt out of receiving any future
                  emails related to your order
                </Typography>
              </Box>
              <Box sx={{ marginTop: "20px", display: "flex" }}>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "grey",
                    }}
                    onClick={handleYourDetails}
                  >
                    Next
                  </Button>
                </Box>
                {loaderSpinner ? (
                  <Box sx={{ marginLeft: "20px" }}>
                    <l-momentum size="27" speed="1.1" color="grey"></l-momentum>
                  </Box>
                ) : null}
              </Box>
              {/* </form> */}
            </Box>
          ) : (
            <Box sx={{ margin: "20px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ marginBottom: "30px" }}>
                  Shipping Details
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      color: "white",
                      backgroundColor: "grey",
                    }}
                    onClick={() => {
                      setShippingInfoState(true);
                      setShippingMethodState(true);
                      setLoaderSpinner(false);
                      setLoaderSpinnerMethod(false);
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: "flex", marginTop: "30px" }}>
                <Typography sx={{ marginRight: "5px" }}>
                  {formData.firstName}
                </Typography>
                <Typography>{formData.lastName}</Typography>
              </Box>
              <Box>
                <Typography>{formData.addressLine1}</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ marginRight: "5px" }}>
                  {formData.country}
                </Typography>
                <Typography>{formData.postcode}</Typography>
              </Box>
              <Box sx={{ marginTop: "30px" }}>
                <Typography>{formData.email}</Typography>
              </Box>
              <Box>
                <Typography>{formData.phoneNumber}</Typography>
              </Box>
              <Box sx={{ marginTop: "20px" }}>
                Order updates will be sent by email 📨
              </Box>
            </Box>
          )}
        </form>
        <Box
          sx={{
            margin: "20px",
            width: "70%",
            padding: 3,
            border: "1px solid grey",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "30px" }}>
            Order Summary
          </Typography>
          {cartItems.map((cartItem) => (
            <Box key={cartItem.title} sx={{ marginBottom: "45px" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "40%" }}>
                  <img
                    src={cartItem.img}
                    alt="Image"
                    style={{ width: "50%", height: "auto" }}
                  />
                </Box>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ marginBottom: "5px", width: "110px" }}
                    className="md:ml-0 ml-5"
                  >
                    {cartItem.title}
                  </Box>
                  <Box className="md:ml-0 ml-5">Qty: {cartItem.quantity}</Box>
                </Box>
                <Box sx={{ marginLeft: "50px", marginRight: "20px" }}>
                  SGD${cartItem.price * cartItem.quantity}
                </Box>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              width: "100%",

              border: "1px solid lightgrey",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ marginLeft: "20px", marginTop: "20px" }}>
              Subtotal
            </Typography>
            <Box sx={{ marginRight: "20px", marginTop: "20px" }}>
              SGD${subTotal}
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ marginLeft: "20px", marginTop: "20px" }}>
              Shipping
            </Typography>
            <Box sx={{ marginRight: "20px", marginTop: "20px" }}>SGD$0</Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ marginLeft: "20px", marginTop: "20px" }}>
              Taxes
            </Typography>
            <Box sx={{ marginRight: "20px", marginTop: "20px" }}>SGD$0</Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "45px",
              border: "1px solid lightgrey",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ marginLeft: "20px", marginTop: "20px" }}>
                Order Total
              </Typography>
              <Box sx={{ marginRight: "20px", marginTop: "20px" }}>
                SGD${subTotal}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            margin: "20px",
            width: "50%",
            padding: 3,
            border: "1px solid grey",
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>Shipping Method</Box>
          </Box>
          {!shippingInfoState && shippingMethodState ? (
            <>
              <Box
                sx={{
                  marginTop: "20px",
                  width: "80%",
                  padding: 3,
                  border: "1px solid grey",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Checkbox {...label} disabled checked />
                  <Typography sx={{ marginTop: "10px", marginLeft: "5px" }}>
                    Couriers & Singapore Post
                  </Typography>
                  <Typography sx={{ marginTop: "10px", marginLeft: "5px" }}>
                    SGD$0.00
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "grey",
                    }}
                    onClick={handleYourShippingMethod}
                  >
                    Next
                  </Button>
                </Box>
                {loaderSpinnerMethod ? (
                  <Box sx={{ marginLeft: "20px", marginTop: "20px" }}>
                    <l-momentum size="27" speed="1.1" color="grey"></l-momentum>
                  </Box>
                ) : null}
              </Box>
            </>
          ) : !shippingMethodState ? (
            <>
              <Box
                sx={{
                  marginTop: "20px",
                  width: "80%",
                  padding: 3,
                  border: "1px solid grey",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ marginTop: "10px", marginLeft: "5px" }}>
                    Couriers & Singapore Post
                  </Typography>
                  <Typography sx={{ marginTop: "10px", marginLeft: "5px" }}>
                    SGD$0.00
                  </Typography>
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            margin: "20px",
            width: "50%",
            padding: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {!shippingInfoState && !shippingMethodState ? (
              <Button variant="outlined" onClick={handleCheckout}>
                Checkout!
              </Button>
            ) : null}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CheckoutPage;
