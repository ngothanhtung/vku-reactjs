import {  DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import ProductPage from "./ProductPage";



export const routesProduct: RouteItem[] = [
  {
    path: '/product',
    label: 'Products',
    key: 'product',
    icon: <DatabaseOutlined />,
    element: <ProductPage />,
    isShowMenu: true,
    isPrivate: true,
  },
]