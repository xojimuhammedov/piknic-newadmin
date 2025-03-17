import HomeSvg from "@/svg/HomeSvg";
import PeopleLogo from "@/svg/PeopleLogo";
import SettingSvg from "@/svg/SettingSvg";
import ProductIcon from "@/svg/Products";
import TeamIcon from "@/svg/TeamIcon";
import BlogIcon from "@/svg/BlogIcon";
import UserIcon from "@/svg/UserIcon";
import RefundIcon from "@/svg/RefundIcon";
import PdfIcon from "@/svg/PdfIcon";
import OrderIcon from "@/svg/OrderSvg";

interface MenuItem {
  id: number;
  text: string;
  icon: () => JSX.Element;
  link?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  link: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    text: "Asosiy",
    icon: HomeSvg,
    link: "/",
  },
  {
    id: 7,
    text: "Bo'limlar",
    icon: BlogIcon,
    submenu: [
      {
        text: "Bo'limlar",
        link: "/categories",
      },
      {
        text: "Bo'limlar Yaratish",
        link: "/create-categories",
      },
    ],
  },

  {
    id: 8,
    text: "Mahsulotlar",
    icon: BlogIcon,
    submenu: [
      {
        text: "Mahsulotlar",
        link: "/products",
      },
      {
        text: "Mahsulot yaratish",
        link: "/create-products",
      },
    ],
  },
  {
    id: 9,
    text: "Blog",
    icon: BlogIcon,
    submenu: [
      {
        text: "Blog",
        link: "/news",
      },
      {
        text: "Blog yaratish",
        link: "/create-news",
      },
    ],
  },
];
