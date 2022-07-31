import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, Navigate, Link } from "react-router-dom";

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  if (!localStorage.getItem("UserAdmin")) {
    return <Navigate to="/auth/login" replace />;
  }
  const { Header, Sider, Content } = Layout;

  console.log(Header);

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/user">Người dùng</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/movie">Phim</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
