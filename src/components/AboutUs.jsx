import React from 'react';
import Navbar from './Navbar';
import { Box, Typography } from '@mui/material';
import AboutUsHero from './AboutUsHero';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Box>
        <Box>
          <AboutUsHero />
        </Box>
      </Box>
    </div>
  );
};

export default AboutUs;
