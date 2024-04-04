import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCirclePlus,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Viewpage from "../Viewpage";
import Create from "../Create";
import Status from "../Status";
import toast from "react-hot-toast";
import crmlogo from "../../assets/crmlogo.png";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <FontAwesomeIcon icon={faHouse} />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <FontAwesomeIcon icon={faCirclePlus} />,
    label: "Create Request",
  },
  {
    key: "3",
    icon: <FontAwesomeIcon icon={faCheckCircle} />,
    label: "Check Status",
  },
];

const Service = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(items[0]);
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    setLogoutClicked(true);
    toast
      .promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        }),
        {
          loading: "Getting back...",
          success: "Back to Dashboard",
          error: "Logout Failed",
        }
      )
      .then(() => {
        navigate("/admin/dashboard");
      });
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  let componentToRender;

  // Determine which component to render based on selectedMenuItem
  if (selectedMenuItem.label === "Dashboard") {
    componentToRender = <Viewpage />;
  } else if (selectedMenuItem.label === "Create Request") {
    componentToRender = <Create />;
  } else if (selectedMenuItem.label === "Check Status") {
    componentToRender = <Status />;
  } else {
    // Default fallback if selectedMenuItem does not match any condition
    componentToRender = <div>No component selected</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ backgroundColor: "white" }}
      >
        <div style={{ height: "10%" }}>
          <img
            src={crmlogo}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ height: "90%" }}
        >
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuItemClick(item)}
            >
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
          <div style={{ color: "#fff", fontSize: "17px" }}>
            {selectedMenuItem.label}
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
        <Content style={{ margin: "0 16px", overflowY: "auto" }}>
          <div style={{ margin: "16px 0" }}>
            <Breadcrumb>
              <Breadcrumb.Item>{`Maintain ${selectedMenuItem.label}`}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: "5px",
              overflowY: "auto",
              maxHeight: "calc(100vh - 130px)",
            }}
          >
            {componentToRender}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Service;
