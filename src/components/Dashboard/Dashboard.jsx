import { Layout } from "antd";
import { useStateContext } from "../../context/StateContext";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
const { Content } = Layout;

const Dashboard = ({children}) => {
  const { collapsed, colorBgContainer, borderRadiusLG } = useStateContext();

  return (
    <Layout>
      <SideBar />
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <TopBar />
        <Content
          style={{
            margin: "90px 16px 18px 16px",
            minHeight: "82dvh",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
