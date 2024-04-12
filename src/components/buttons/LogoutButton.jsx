import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LogoutButton = () => {
  // const { cartItems } = useContext(CartContext);
  const { logout } = useAuth0();

  const logOut = () => {
    localStorage.removeItem('cartItems');
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Button
      variant="contained"
      sx={{ color: 'black', backgroundColor: 'white' }}
      onClick={logOut}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
