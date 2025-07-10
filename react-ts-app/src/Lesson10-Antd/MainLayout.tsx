import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: 'home',
    label: 'Trang chủ',
  },
  {
    key: 'tasks',
    label: 'Our tasks',
  },
  {
    key: 'create-task',
    label: 'Create task',
  },

  {
    key: 'assignee-me',
    label: 'My tasks',
  },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
            defaultSelectedKeys={[location.pathname.replace('/', '') || 'home']}
            selectedKeys={[location.pathname.replace('/', '') || 'home']}
            items={menuItems}
            onSelect={(item) => {
              console.log(item.key);
              navigate('/' + item.key);
            }}
          />
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]} />
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>VKU Design ©{new Date().getFullYear()} Created by VKU</Footer>
      </Layout>
    </div>
  );
}
