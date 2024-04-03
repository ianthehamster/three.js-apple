import { appleImg, bagImg, searchImg } from "../utils";
// import { navLists } from "../constants";
import { Link } from "react-router-dom";
import DevicesIcon from "@mui/icons-material/Devices";
import BasicMenu from "./minorComponents/DropDownMenu";
import { Button, Typography, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { getTotalCartItemsQty } = useContext(CartContext);
  const cartQuantity = getTotalCartItemsQty();
  return (
    <header
      className="w-full py-5 sm:px-10 px-5 flex justify-between items-center bg-black"
      style={{ width: "100%" }}
    >
      <nav className="flex w-full screen-max-width">
        <DevicesIcon style={{ color: "white", marginRight: "15px" }} />

        <Typography variant="p" style={{ color: "white" }}>
          Techie E-Store
        </Typography>

        {/* <div className="flex flex-1 justify-center max-sm:hidden"> */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                navigate("/");
              }}
              style={{ color: "white" }}
            >
              Home
            </Button>
          </div>
          <div>
            <BasicMenu />
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                navigate("/aboutUs");
              }}
              style={{ color: "white" }}
            >
              About us
            </Button>
          </div>
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="search" width={18} height={18} />
          <Badge badgeContent={cartQuantity} color="primary">
            <img
              src={bagImg}
              alt="bag"
              width={18}
              height={18}
              onClick={() => {
                navigate("/cart");
              }}
            />
          </Badge>
          <div style={{ color: "white" }}>
            Hello {isAuthenticated ? `${user.first_name}` : `Guest`}
          </div>
          <div style={{ color: "white" }}>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

/*
<div className="flex flex-1 justify-center max-sm:hidden">
  {navLists.map((nav) => (
    <div
      key={nav}
      className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
    >
    
      {console.log(nav)}

      {nav === 'Home' ? (
        <Link to="/">{nav}</Link>
      ) : nav === 'Categories' ? (
        <Link to="/categories">{nav}</Link>
      ) : null}
    </div>
  ))}
</div>
*/
