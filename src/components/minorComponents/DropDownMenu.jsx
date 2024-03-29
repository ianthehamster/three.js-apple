import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e.target.innerText);

    const targetPage = e.target.innerText;
    switch (targetPage) {
      case 'Laptops':
        navigate('/laptopPage');
        break;
      case 'Phones':
        navigate('/phonesPage');
        break;
      case 'Accessories':
        navigate('/accessoriesPage');
        break;
      case 'Tablets':
        navigate('/tabletsPage');
        break;
      default:
        console.log('Please click a valid option');
    }

    if (e.target.innerText === 'Laptops') {
      // Test link
      navigate('/laptopPage');
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: 'white' }}
      >
        Shop
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Laptops</MenuItem>
        <MenuItem onClick={handleClose}>Phones</MenuItem>
        <MenuItem onClick={handleClose}>Accessories</MenuItem>
        <MenuItem onClick={handleClose}>Tablets</MenuItem>
      </Menu>
    </div>
  );
}
