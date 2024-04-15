import { appleImg, bagImg, searchImg } from '../utils';
// import { navLists } from "../constants";
import { Link } from 'react-router-dom';
import DevicesIcon from '@mui/icons-material/Devices';
import BasicMenu from './minorComponents/DropDownMenu';
import { Button, Typography, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import { CartContext } from '../context/CartContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constantVariables';
import { mainLogo } from '../utils';

import { NavMobile } from './NavMobile';

const Navbar = ({ isUserInDb }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { getTotalCartItemsQty } = useContext(CartContext);
  const cartQuantity = getTotalCartItemsQty();

  const isSmallScreen = window.innerWidth <= 640;

  const postNewUser = async () => {
    if (isUserInDb === false) {
      // console.log(`postNewUser is called`);
      await axios
        .post(`${BACKEND_URL}/users`, {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.name,
        })
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    console.log('useEffect is called but postNewUser is not called');
    if (user && isUserInDb === false) {
      console.log('useEffect is called correctly');
      postNewUser();
    }
  }, [user, isUserInDb]);

  return (
    <header
      className="w-full py-5 sm:px-10 px-5 flex justify-between items-center bg-black"
      style={{ width: '100%' }}
    >
      <nav className="flex w-full screen-max-width">
        <img
          src={mainLogo}
          alt="App Logo"
          style={{ width: '120px', height: 'auto' }}
        />

        <div className="flex flex-1 justify-center max-sm:hidden">
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={() => {
                navigate('/');
              }}
              style={{ color: 'white' }}
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
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={() => {
                navigate('/aboutUs');
              }}
              style={{ color: 'white' }}
            >
              About us
            </Button>
          </div>
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Badge badgeContent={cartQuantity} color="primary">
            <img
              src={bagImg}
              alt="bag"
              width={18}
              height={18}
              onClick={() => {
                navigate('/cart');
              }}
            />
          </Badge>
          <div
            style={{
              color: 'white',
              ...(isSmallScreen && { marginRight: '30px' }),
            }}
          >
            Hello {isAuthenticated ? `${user.first_name}` : `Guest`}
          </div>

          <div className="hidden md:block" style={{ color: 'white' }}>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
        <div className="md:hidden">
          <NavMobile />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
