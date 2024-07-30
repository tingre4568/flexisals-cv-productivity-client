import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const { Sider } = Layout;

const SideBar = () => {
  const { collapsed, isAdmin } = useStateContext();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      key: "/",
      icon: <UserOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/productivity",
      icon: <FaUsers />,
      label: <Link to="/productivity">Productivity</Link>,
    },
    ...(isAdmin === true
      ? [
          {
            key: "/admin/users-list",
            icon: <UsergroupAddOutlined />,
            label: <Link to="/admin/users-list">Users List</Link>,
          },
          // {
          //   key: "/reports",
          //   icon: <RiAdminLine />,
          //   label: <Link to="/reports">Reports</Link>,
          // },
          // {
          //   key: "/admin/add-user",
          //   icon: <UsergroupAddOutlined />,
          //   label: <Link to="/admin/add-user">Add User</Link>,
          // },
          // {
          //   key: "/admin/edit-user",
          //   icon: <UsergroupAddOutlined />,
          //   label: <Link to="/admin/edit-user">Edit User</Link>,
          // },
        ]
      : []),
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-indigo-600"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="flex items-center justify-center py-6">
        {collapsed ? (
          <span className="text-white font-semibold text-xl">CV</span>
        ) : (
          <span className="text-white font-semibold text-xl">
            Contact Verification
          </span>
        )}
      </div>
      <Menu
        theme="dark"
        style={{ background: "transparent" }}
        mode="inline"
        selectedKeys={[currentPath]}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideBar;
