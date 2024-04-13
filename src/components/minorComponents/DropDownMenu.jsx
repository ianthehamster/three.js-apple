import * as React from "react";
import Button from "@mui/material/Button";
import { Paper, MenuItem, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../constantVariables";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const getCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories`);
      const categoryNames = response.data.map((category) => category.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //HARDCODED CATEGORIES
  // const handleClose = (e) => {
  //   // console.log(e.target.innerText);

  //   const targetPage = e.target.innerText;
  //   switch (targetPage) {
  //     case "Laptops":
  //       navigate("/laptopPage");
  //       break;
  //     case "Phones":
  //       navigate("/phonesPage");
  //       break;
  //     case "Accessories":
  //       navigate("/accessoriesPage");
  //       break;
  //     case "Tablets":
  //       navigate("/tabletsPage");
  //       break;
  //     default:
  //       console.log("Please click a valid option");
  //   }

  //   if (e.target.innerText === "Laptops") {
  //     // Test link
  //     navigate("/laptopPage");
  //   }
  //   setAnchorEl(null);
  // };
  const handleClose = (e) => {
    const targetPage = e.target.innerText.toLowerCase();
    const path = `/${targetPage}`;
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "white" }}
      >
        Shop
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Laptops</MenuItem>
        <MenuItem onClick={handleClose}>Phones</MenuItem>
        <MenuItem onClick={handleClose}>Accessories</MenuItem>
        <MenuItem onClick={handleClose}>Tablets</MenuItem> */}

        {categories.map((category) => (
          <MenuItem key={category} onClick={handleClose}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
