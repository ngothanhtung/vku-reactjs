import {  UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import LoginPage from "./LoginPage";


export const routesAuth: RouteItem[] = [
  {
    path: '/login',
    label: 'Login',
    key: '',
    isShowMenu: false,
    icon: <UserOutlined />,
    element: <LoginPage />,
    isPrivate: false, // Không yêu cầu đăng nhập để truy cập trang đăng nhập
  },
]