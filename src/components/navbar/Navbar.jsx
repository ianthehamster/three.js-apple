import { bagImg } from '../../utils';
import BasicMenu from '../categories/DropDownMenu';
import { Button, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../buttons/LoginButton';
import LogoutButton from '../buttons/LogoutButton';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { mainLogo } from '../../utils';
import { NavMobile } from './NavMobile';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { getTotalCartItemsQty } = useContext(CartContext);
  const cartQuantity = getTotalCartItemsQty();

  const isSmallScreen = window.innerWidth <= 640;

  return (
    <header
      className="w-full py-5 sm:px-10 px-5 flex justify-between items-center bg-black"
      style={{ width: '100%' }}
    >
      <nav className="flex w-full screen-max-width">
        <img
          src={mainLogo}
          alt="App Logo"
          style={{ width: '120px', height: 'auto' }} // I am sure your CSS library will be able to facilitate most of such standard css
        />

        <div className="flex flex-1 justify-center max-sm:hidden">
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined} // open && 'basic-menu'
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
          <div className="max-sm:hidden">
            {isAuthenticated && (
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={() => {
                  navigate('/my-orders');
                }}
                style={{ color: 'white' }}
              >
                My orders
              </Button>
            )}
            {/* so much repetition, so little refactoring */}
          </div>

          <div className="hidden md:block" style={{ color: 'white' }}>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
        <div className="md:hidden" style={{ marginRight: '10px' }}>
          <NavMobile />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
