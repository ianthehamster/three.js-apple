import { PiChatCircleBold } from 'react-icons/pi';
import { IoPricetagsOutline } from 'react-icons/io5';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TabletIcon from '@mui/icons-material/Tablet';
import InfoIcon from '@mui/icons-material/Info';

export const routes = [
  {
    title: 'Home',
    href: '/',
    Icon: HomeIcon,
  },
  {
    title: 'Laptops',
    href: '/laptopsPage',
    Icon: ComputerIcon,
  },
  {
    title: 'Phones',
    href: '/phonesPage',
    Icon: PhoneIphoneIcon,
  },
  {
    title: 'Accessories',
    href: '/accessoriesPage',
    Icon: HeadsetMicIcon,
  },
  {
    title: 'Tablets',
    href: '/tabletsPage',
    Icon: TabletIcon,
  },
  {
    title: 'About Us',
    href: '/aboutUs',
    Icon: InfoIcon,
  },
];
