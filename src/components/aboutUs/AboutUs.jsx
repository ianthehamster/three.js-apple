import React from "react";
import Navbar from "../navbar/Navbar";
import { Box } from "@mui/material";
import AboutUsHero from "./AboutUsHero";

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
