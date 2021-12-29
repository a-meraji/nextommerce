import {
  HomeIcon,
  PhoneIcon,
  InformationCircleIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
export const sideList = [
  { name: "Home", icon: HomeIcon, url: "/" },
  { name: "Categories", icon: TemplateIcon, url: "/search" },
  { name: "About", icon: InformationCircleIcon, url: "/about" },
  { name: "Contact", icon: PhoneIcon, url: "/contact" },
];
export const socialLinks = [
  { url: "https://twitter.com/mamad_coder", icon: FiTwitter },
  { url: "https://twitter.com/mamad_coder", icon: FiInstagram },
  { url: "https://twitter.com/mamad_coder", icon: FiFacebook },
  { url: "https://twitter.com/mamad_coder", icon: FaWhatsapp },
];

export const sortView = [
{sort:"relevence", name:'relevence'},
{sort:"sale", name:'on sale'},
{sort:"latest", name:'latest arivals'},
{sort:"price_inc", name:'prcie: low to high'},
{sort:"price_dec", name:'price: high to low'},
]

export const relevence='relevence';
export const sale='sale';
export const latest='latest';
export const price_inc='price_inc';
export const price_dec='price_dec';
