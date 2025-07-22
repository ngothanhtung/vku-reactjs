
import {
  SettingOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import { routesDashboard } from '../modules/dashboard/dashboard.route';
import { routesAuth } from '../modules/auth/auth.route';
import { routesProduct } from '../modules/product/product.route';

export type RouteItem = {
  path?: string;
  label: string;
  key: string;
  icon?: ReactNode;
  element?: React.ReactNode | null;
  children?: RouteItem[];
  isShowMenu: boolean; // Thêm thuộc tính này để xác định có hiển thị menu hay không
  isPrivate: boolean; // Thêm thuộc tính này để xác định có phải là route riêng tư hay không
};

export const routes: RouteItem[] = [
  ...routesDashboard, //đăng ký route dashboard
  ...routesAuth,
  ...routesProduct,
  
  {
    path: '/customers',
    label: 'Customer',
    key: 'customers',
    icon: <UserOutlined />,
    element: null,
    isShowMenu: true,
    isPrivate: true,
  },
  {
    label: 'Orders',
    key: 'sales',
    icon: <FileTextOutlined />,
    isShowMenu: true,
    isPrivate: true,
    children: [
      {
        path: '/sales/orders',
        label: 'Đơn hàng',
        key: 'sales-orders',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
      {
        path: '/sales/orders/status',
        label: 'Thống kê theo trạng thái',
        key: 'sales-orders-status',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
      {
        path: '/sales/orders/payment-status',
        label: 'Thống kê theo thanh toán',
        key: 'sales-orders-payment-status',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
    ],
  },
  {
    path: '/employees',
    label: 'Employees',
    key: 'employees',
    icon: <UserOutlined />,
    element: null,
    isShowMenu: true,
    isPrivate: true,
  },
  {
    label: 'Settings',
    key: 'settings',
    isShowMenu: true,
    isPrivate: true,
    icon: <SettingOutlined />,
    children: [
      {
        path: '/settings/management-system',
        label: 'Hệ thống',
        key: 'management-system',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
      {
        path: '/settings/management-payments',
        label: 'Thanh toán',
        key: 'management-payments',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
    ],
  },
];
