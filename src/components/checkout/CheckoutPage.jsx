import React, { useState, useMemo, useContext } from 'react';
import Navbar from '../Navbar';
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Button,
  Checkbox,
} from '@mui/material';
// import { CartContext } from '../context/CartContext';
import { CartContext } from '../../context/CartContext';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { momentum } from 'ldrs';

momentum.register();

const CheckoutPage = () => {
  const [countryValue, setCountryValue] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    postcode: '',
    phoneNumber: '',
  });

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const { cartItems } = useContext(CartContext);

  const [shippingInfoState, setShippingInfoState] = useState(true);
  const [loaderSpinner, setLoaderSpinner] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (e) => {
    console.log(e.label);
    const value = e.label;
    setCountryValue(value);
  };

  const handleYourDetails = (e) => {
    setLoaderSpinner(true);
    setTimeout(() => {
      setShippingInfoState(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { id } = e.target;
    let { value } = e.target;

    if (id === 'phoneNumber' || id === 'postcode') {
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

  console.log(cartItems);

  return (
    <div>
      <Navbar />
      <Typography variant="h5" sx={{ margin: '20px', marginTop: '50px' }}>
        Secure Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        {shippingInfoState ? (
          <Box
            sx={{
              margin: '20px',
              width: '60%',
              padding: 3,
              border: '1px solid grey',
              borderRadius: 1,
            }}
          >
            {/* <form> */}
            <Typography variant="h6" sx={{ marginBottom: '12px' }}>
              Your Details
            </Typography>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <TextField
              fullWidth
              id="email"
              variant="outlined"
              // margin="normal"
              required
              onChange={handleInputChange}
              sx={{ marginBottom: '25px' }}
            />
            <Typography variant="h6" sx={{ marginBottom: '12px' }}>
              Shipping Information
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '50%', marginRight: '10px' }}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <TextField
                  fullWidth
                  id="firstName"
                  variant="outlined"
                  // margin="normal"
                  required
                  onChange={handleInputChange}
                  sx={{ marginBottom: '25px' }}
                />
              </Box>
              <Box sx={{ width: '50%', marginLeft: '10px' }}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <TextField
                  fullWidth
                  id="lastName"
                  variant="outlined"
                  // margin="normal"
                  required
                  onChange={handleInputChange}
                  sx={{ marginBottom: '25px' }}
                />
              </Box>
            </Box>
            <InputLabel htmlFor="addressLine1">Address Line 1</InputLabel>
            <TextField
              fullWidth
              id="addressLine1"
              variant="outlined"
              // margin="normal"
              required
              onChange={handleInputChange}
              sx={{ marginBottom: '25px' }}
            />
            <InputLabel htmlFor="addressLine2">Address Line 2</InputLabel>
            <TextField
              fullWidth
              id="addressLine2"
              variant="outlined"
              // margin="normal"
              required
              onChange={handleInputChange}
              sx={{ marginBottom: '25px' }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '50%', marginRight: '10px' }}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <TextField
                  fullWidth
                  id="country"
                  variant="outlined"
                  // margin="normal"
                  required
                  onChange={handleInputChange}
                  sx={{ marginBottom: '25px' }}
                />
              </Box>
              <Box sx={{ width: '50%', marginRight: '10px' }}>
                <InputLabel htmlFor="postcode">Postcode</InputLabel>
                <TextField
                  fullWidth
                  id="postcode"
                  variant="outlined"
                  // margin="normal"
                  required
                  onChange={handleInputChange}
                  sx={{ marginBottom: '25px' }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '35%', marginRight: '10px' }}>
                <InputLabel htmlFor="country-code">Phone Number</InputLabel>
                {/* <TextField
                fullWidth
                id="country-code"
                variant="outlined"
                // margin="normal"
                required
                sx={{ marginBottom: '25px' }}
              /> */}
                <Select
                  options={options}
                  countryValue={countryValue}
                  onChange={changeHandler}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      height: '56px', // Adjust the height as needed
                    }),
                  }}
                />
              </Box>
              <Box sx={{ width: '65%', marginRight: '10px' }}>
                <InputLabel htmlFor="phoneNumber">‎</InputLabel>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  variant="outlined"
                  required
                  onChange={handleInputChange}
                  sx={{ marginBottom: '25px' }}
                />
              </Box>
            </Box>
            <Box sx={{ marginTop: '25px' }}>
              <Typography variant="p" sx={{ fontSize: '15px' }}>
                By providing your phonenumber, you agree to receive text
                messages related to your order. Reply STOP to opt out of
                receiving any future text messages related to your order
              </Typography>
            </Box>
            <Box sx={{ marginTop: '20px', display: 'flex' }}>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: 'grey',
                  }}
                  onClick={handleYourDetails}
                >
                  Next
                </Button>
              </Box>
              {loaderSpinner ? (
                <Box sx={{ marginLeft: '20px' }}>
                  <l-momentum size="27" speed="1.1" color="grey"></l-momentum>
                </Box>
              ) : null}
            </Box>
            {/* </form> */}
          </Box>
        ) : (
          <Box
            sx={{
              margin: '20px',
              width: '60%',
              padding: 3,
              border: '1px solid grey',
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>Shipping Method</Box>
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    color: 'white',
                    backgroundColor: 'grey',
                  }}
                  onClick={() => {
                    setShippingInfoState(true);
                    setLoaderSpinner(false);
                  }}
                >
                  Edit
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
              <Typography sx={{ marginRight: '5px' }}>
                {formData.firstName}
              </Typography>
              <Typography>{formData.lastName}</Typography>
            </Box>
            <Box>
              <Typography>{formData.addressLine1}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ marginRight: '5px' }}>
                {formData.country}
              </Typography>
              <Typography>{formData.postcode}</Typography>
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <Typography>{formData.email}</Typography>
            </Box>
            <Box>
              <Typography>{formData.phoneNumber}</Typography>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            margin: '20px',
            width: '60%',
            padding: 3,
            border: '1px solid grey',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>Shipping Method</Box>
          </Box>
          {!shippingInfoState ? (
            <>
              <Box
                sx={{
                  marginTop: '20px',
                  width: '80%',
                  padding: 3,
                  border: '1px solid grey',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Checkbox {...label} disabled checked />
                  <Typography sx={{ marginTop: '10px', marginLeft: '5px' }}>
                    Couriers & Singapore Post
                  </Typography>
                  <Typography sx={{ marginTop: '10px', marginLeft: '5px' }}>
                    SGD$0.00
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: 'grey',
                  }}
                  onClick={handleYourDetails}
                >
                  Next
                </Button>
              </Box>
            </>
          ) : null}
        </Box>
      </form>
    </div>
  );
};

export default CheckoutPage;
