import { PiChatCircleBold } from "react-icons/pi";
import { IoPricetagsOutline } from "react-icons/io5";
import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import TabletIcon from "@mui/icons-material/Tablet";
import InfoIcon from "@mui/icons-material/Info";
import { TABLETS, LAPTOPS, ACCESSORIES, PHONES } from "../constantVariables";

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    title: "Laptops",
    href: `/${LAPTOPS}`,
    Icon: ComputerIcon,
  },
  {
    title: "Phones",
    href: `/${PHONES}`,
    Icon: PhoneIphoneIcon,
  },
  {
    title: "Accessories",
    href: `/${ACCESSORIES}`,
    Icon: HeadsetMicIcon,
  },
  {
    title: "Tablets",
    href: `/${TABLETS}`,
    Icon: TabletIcon,
  },
  {
    title: "About Us",
    href: "/aboutUs",
    Icon: InfoIcon,
  },
];
