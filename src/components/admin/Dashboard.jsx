import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCirclePlus,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import AdminDashboard from "../AdminDashboard";
import toast from "react-hot-toast";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <FontAwesomeIcon icon={faHouse} />,
    label: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    key: "2",
    icon: <FontAwesomeIcon icon={faCirclePlus} />,
    label: "Create Request",
    link: "/createpage",
  },
  {
    key: "3",
    icon: <FontAwesomeIcon icon={faCheckCircle} />,
    label: "Check Status",
    link: "/statuspage",
  },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    setLogoutClicked(true);
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        loading: "Logging out...",
        success: "Logout Successfully",
        error: "Logout Failed",
      }
    ).then(() => {
      navigate("/");
    });
  };
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ paddingTop: "64px" }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <div style={{ color: "#fff", fontSize: "17px" }}>Dashboard</div>
          <div>
            <button
              onClick={handleLogout}
              style={{
                marginRight: "10px",
                color: "#fff",
                background: "transparent",
                border: "none",
              }}
            >
              Logout
            </button>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ margin: "16px 0" }}>
            <Breadcrumb>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: "5px",
            }}
          >
            <AdminDashboard />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
