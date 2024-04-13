import { PiChatCircleBold } from "react-icons/pi";
import { IoPricetagsOutline } from "react-icons/io5";
import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import TabletIcon from "@mui/icons-material/Tablet";
import InfoIcon from "@mui/icons-material/Info";

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    title: "Laptops",
    href: "/laptops",
    Icon: ComputerIcon,
  },
  {
    title: "Phones",
    href: "/phones",
    Icon: PhoneIphoneIcon,
  },
  {
    title: "Accessories",
    href: "/accessories",
    Icon: HeadsetMicIcon,
  },
  {
    title: "Tablets",
    href: "/tablets",
    Icon: TabletIcon,
  },
  {
    title: "About Us",
    href: "/aboutUs",
    Icon: InfoIcon,
  },
];
