import React from 'react';
import Navbar from '../Navbar';
import { Box, InputLabel, TextField, Typography } from '@mui/material';

const CheckoutPage = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          margin: '20px',
          width: '60%',
          padding: 3,
          border: '1px solid grey',
          borderRadius: 1,
        }}
      >
        <form>
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
            sx={{ marginBottom: '25px' }}
          />
          <Typography variant="h6" sx={{ marginBottom: '12px' }}>
            Shipping Information
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '50%', marginRight: '10px' }}>
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <TextField
                fullWidth
                id="first-name"
                variant="outlined"
                // margin="normal"
                required
                sx={{ marginBottom: '25px' }}
              />
            </Box>
            <Box sx={{ width: '50%', marginLeft: '10px' }}>
              <InputLabel htmlFor="last-name">Last Name</InputLabel>
              <TextField
                fullWidth
                id="last-name"
                variant="outlined"
                // margin="normal"
                required
                sx={{ marginBottom: '25px' }}
              />
            </Box>
          </Box>
          <InputLabel htmlFor="address-line-1">Address Line 1</InputLabel>
          <TextField
            fullWidth
            id="address-line-1"
            variant="outlined"
            // margin="normal"
            required
            sx={{ marginBottom: '25px' }}
          />
          <InputLabel htmlFor="address-line-2">Address Line 2</InputLabel>
          <TextField
            fullWidth
            id="address-line-2"
            variant="outlined"
            // margin="normal"
            required
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
                sx={{ marginBottom: '25px' }}
              />
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default CheckoutPage;
