import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TabletIcon from '@mui/icons-material/Tablet';
import InfoIcon from '@mui/icons-material/Info';
import { TABLETS, LAPTOPS, ACCESSORIES, PHONES } from '../constantVariables';
// i think this could be a .js file since there is no component here
export const routes = [
  {
    title: 'Home',
    href: '/',
    Icon: HomeIcon,
  },
  {
    title: 'Laptops',
    href: `/${LAPTOPS}`,
    Icon: ComputerIcon,
  },
  {
    title: 'Phones',
    href: `/${PHONES}`,
    Icon: PhoneIphoneIcon,
  },
  {
    title: 'Accessories',
    href: `/${ACCESSORIES}`,
    Icon: HeadsetMicIcon,
  },
  {
    title: 'Tablets',
    href: `/${TABLETS}`,
    Icon: TabletIcon,
  },
  {
    title: 'About Us',
    href: '/aboutUs',
    Icon: InfoIcon,
  },
  // {
  //   title: 'My Orders',
  //   href: '/my-orders',
  //   Icon: MenuBookIcon,
  // },
];
