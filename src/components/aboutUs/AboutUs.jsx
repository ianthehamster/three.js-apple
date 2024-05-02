import React from "react";
import Navbar from "../navbar/Navbar";
import { Box } from "@mui/material";
import AboutUsHero from "./AboutUsHero";

// I think you should have created a "pages" folder alongside the components folder to place all pages instead of just creating subfolders in the components folder

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
