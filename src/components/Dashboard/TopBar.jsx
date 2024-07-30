import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useStateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const TopBar = () => {
  const {
    loggedInUserName,
    collapsed,
    setCollapsed,
    colorBgContainer,
    token,
    setToken,
    setIsAdmin,
    setLoggedInUserName,
  } = useStateContext();
  
  const navigate = useNavigate();
  const {} = useStateContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setIsAdmin(null);
    setLoggedInUserName(null);
    navigate("/signin");
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        position: "fixed",
        zIndex: 1,
        width: "100vw",
        left: 0,
        top: 0,
        marginLeft: collapsed ? 80 : 200,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </div>
        <div className={collapsed ? "mr-[120px]" : "mr-[240px]"}>
          {token && (
            <Button
              type="dashed"
              onClick={handleLogout}
              className="flex justify-between items-center"
            >
              {loggedInUserName} <LogoutOutlined />
            </Button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default TopBar;
