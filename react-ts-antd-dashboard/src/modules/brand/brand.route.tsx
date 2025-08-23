import {  DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import BrandPage from "./BrandPage";



export const routesBrand: RouteItem[] = [
  {
    path: '/brands',
    label: 'Brands',
    key: 'brands',
    icon: <DatabaseOutlined />,
    element: <BrandPage />,
    isShowMenu: true,
    isPrivate: true,
  },
]