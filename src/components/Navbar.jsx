import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';
import { Link } from 'react-router-dom';
import DevicesIcon from '@mui/icons-material/Devices';

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <DevicesIcon />
        {/* <img src={appleImg} alt="Apple" width={14} height={18} /> */}

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {/* <Link to='/' */}
              {console.log(nav)}

              {nav === 'Home' ? (
                <Link to="/">{nav}</Link>
              ) : nav === 'Categories' ? (
                <Link to="/categories">{nav}</Link>
              ) : null}
              {/* {nav} */}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
