import React, { useState, useMemo } from 'react';
import Navbar from '../Navbar';
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Button,
} from '@mui/material';
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

  console.log(formData.firstName);

  return (
    <div>
      <Navbar />
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
            Shipping Information
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
          Shipping Method
        </Box>
      </form>
    </div>
  );
};

export default CheckoutPage;
