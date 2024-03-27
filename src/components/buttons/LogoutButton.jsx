import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { CartContext } from "../../context/CartContext";

const LogoutButton = () => {
  // const { cartItems } = useContext(CartContext);
  const { logout } = useAuth0();

  const logOut = () => {
    localStorage.removeItem("cartItems");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return <button onClick={logOut}>Log Out</button>;
};

export default LogoutButton;
