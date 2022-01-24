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

export const bannerImages = [
  {name:"cotton hat",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F491%2FHat-front-white__31525.1602591510.png&w=640&q=85",},
  {name:"light weight jacket",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F512%2FMen-Jacket-Front-Black__15466.1603283963.png&w=1920&q=85",},
  {name:"vercel t-shirt",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F117%2F532%2FMen-TShirt-White-Front__99616.1603284781.png&w=640&q=85",},
  {name:"mask",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F118%2F508%2FSurgical-Mask-Black__89554.1603756821.png&w=750&q=85",},
  {name:"champion packable jacket",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F415%2Fmockup-c2bbbaf4__00019.1601229493.png&w=1920&q=85",},
  {name:"unisex skinny joggers",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F127%2F431%2Fmockup-9fc4c1cf__88683.1601229845.png&w=1920&q=85",},
  {name:"long sleeve shirt",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F136%2F459%2Fmockup-ae9a83b0__49881.1603746586.png&w=1920&q=85",},
  {name:"cotton hat",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F491%2FHat-front-white__31525.1602591510.png&w=640&q=85",},
  {name:"light weight jacket",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F512%2FMen-Jacket-Front-Black__15466.1603283963.png&w=1920&q=85",},
  {name:"vercel t-shirt",url:"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F117%2F532%2FMen-TShirt-White-Front__99616.1603284781.png&w=640&q=85",},

]

export const relevence='relevence';
export const sale='sale';
export const latest='latest';
export const price_inc='price_inc';
export const price_dec='price_dec';


export const refreshToken={type:"REFRESH", age: 60*60*24*365*5};
export const accessToken={type:"ACCESS",age: 10*60};