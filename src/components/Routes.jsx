import { BiHomeAlt2 } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { PiChatCircleBold } from 'react-icons/pi';
import { IoPricetagsOutline } from 'react-icons/io5';

export const routes = [
  {
    title: 'Home',
    href: '/',
    Icon: BiHomeAlt2,
  },
  {
    title: 'Laptops',
    href: '/laptopsPage',
    Icon: FiSearch,
  },
  {
    title: 'Phones',
    href: '/phonesPage',
    Icon: IoPricetagsOutline,
  },
  {
    title: 'Accessories',
    href: '/accessoriesPage',
    Icon: IoPricetagsOutline,
  },
  {
    title: 'Tablets',
    href: '/tabletsPage',
    Icon: IoPricetagsOutline,
  },
  {
    title: 'About Us',
    href: '/aboutUs',
    Icon: PiChatCircleBold,
  },
];
