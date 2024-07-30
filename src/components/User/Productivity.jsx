import { Button, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { getUserTotals } from "../../services/api";
import Dashboard from "../Dashboard/Dashboard";

const Productivity = () => {
  const [userTotals, setUserTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("daily");
  const { users } = useStateContext();
  console.log("users: ", users);

  useEffect(() => {
    const fetchUserTotals = async () => {
      try {
        setLoading(true);
        const response = await getUserTotals(period);
        setUserTotals(response.data.userTotals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user totals:", error);
        setLoading(false);
      }
    };

    fetchUserTotals();
  }, [period]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    ...(["daily", "weekly", "monthly"].includes(period) && [
      {
        title: `${period.charAt(0).toUpperCase() + period.slice(1)} Total`,
        children: [
          {
            title: "Company IVR",
            dataIndex: [period, "companyIVR"],
            key: `${period}CompanyIVR`,
          },
          {
            title: "RPC VM",
            dataIndex: [period, "rpcVM"],
            key: `${period}RpcVM`,
          },
          {
            title: "Direct Dial",
            dataIndex: [period, "directDial"],
            key: `${period}DirectDial`,
          },
          {
            title: "Not Verified",
            dataIndex: [period, "notVerified"],
            key: `${period}NotVerified`,
          },
          {
            title: "Percentage",
            dataIndex: [period, "percentage"],
            key: `${period}percentage`,
            render: (value) =>
              value !== undefined ? value.toFixed(2) : "0.00",
          },
          {
            title: "Productivity",
            dataIndex: [period, "productivity"],
            key: `${period}productivity`,
            render: (value) =>
              value !== undefined ? value.toFixed(2) : "0.00",
          },
        ],
      },
    ]),
  ];

  return (
    <Dashboard>
      <div className="flex justify-end gap-3">
        <Button
          type={period === "daily" ? "primary" : "default"}
          onClick={() => setPeriod("daily")}
        >
          Daily
        </Button>
        <Button
          type={period === "weekly" ? "primary" : "default"}
          onClick={() => setPeriod("weekly")}
        >
          Weekly
        </Button>
        <Button
          type={period === "monthly" ? "primary" : "default"}
          onClick={() => setPeriod("monthly")}
        >
          Monthly
        </Button>
      </div>
      <h2 className="text-2xl font-semibold pb-4">Users Productivity</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={userTotals}
          columns={columns}
          rowKey="employeeID"
          pagination={false}
        />
      )}
    </Dashboard>
  );
};

export default Productivity;
