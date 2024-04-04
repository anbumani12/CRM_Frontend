import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCirclePlus,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Create from "../Create";
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

const Createpage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    setLogoutClicked(true);
    setLoading(true);
    toast
      .promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        }),
        {
          loading: "Loading...",
          success: "Back to Dashboard",
          error: "Logout Failed",
        }
      )
      .then(() => {
        setLoading(false);
        navigate("/admin/dashboard");
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
        <div className="logoo">
          <img
            src="https://i.ibb.co/JqznVLM/LOGO.png"
            alt=""
            style={{
              width: "60px",
              height: "60px",
              marginLeft: "40px",
              marginTop: "-80px",
            }}
          />
        </div>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
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
          <div style={{ color: "#fff", fontSize: "17px", marginLeft: "15px" }}>
            Create Request
          </div>
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
              Back
            </button>
          </div>
        </Header>
        <Content style={{ margin: "16px 16px" }}>
          <div className="create">
            <Breadcrumb>
              <Breadcrumb.Item>Create Request</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <Create />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Createpage;
