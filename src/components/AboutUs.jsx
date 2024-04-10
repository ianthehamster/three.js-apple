import React from 'react';
import Navbar from './Navbar';
import { Box, Typography } from '@mui/material';
import AboutUsHero from './AboutUsHero';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Box>
        {/* <Typography variant="h2">
          Our mission is to enable everyone easy access to our high quality
          technology products
        </Typography> */}

        <Box>
          <AboutUsHero />
        </Box>
      </Box>
    </div>
  );
};

export default AboutUs;
