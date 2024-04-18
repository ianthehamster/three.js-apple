import * as React from "react";
import Button from "@mui/material/Button";
import { MenuItem, Menu } from "@mui/material";
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
        {categories.map((category) => (
          <MenuItem key={category} onClick={handleClose}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
