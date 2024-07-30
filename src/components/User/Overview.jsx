import { Spin, Table } from "antd";
import "antd/dist/reset.css";
import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStateContext } from "../../context/StateContext";
import Target from "./Target";

const Overview = () => {
  const { totals, fetchTotals } = useStateContext();

  useEffect(() => {
    fetchTotals();
  }, []);

  if (!totals) {
    return <Spin tip="Loading..." />;
  }

  const columns = [
    {
      title: "Period",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Company IVR",
      dataIndex: "companyIVR",
      key: "companyIVR",
    },
    {
      title: "Direct Dial",
      dataIndex: "directDial",
      key: "directDial",
    },
    {
      title: "RPC VM",
      dataIndex: "rpcVM",
      key: "rpcVM",
    },
    {
      title: "Not Verified",
      dataIndex: "notVerified",
      key: "notVerified",
    },
    {
      title: "Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
  ];

  const data = [
    {
      key: "1",
      label: "Today",
      ...totals.today,
    },
    {
      key: "2",
      label: "Week",
      ...totals.week,
    },
    {
      key: "3",
      label: "Month",
      ...totals.month,
    },
  ];

  const renderChart = (dataKey) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="companyIVR" fill="#8884d8" />
        <Bar dataKey="rpcVM" fill="#ffc658" />
        <Bar dataKey="directDial" fill="#82ca9d" />
        <Bar dataKey="notVerified" fill="#ff7300" />
        <Bar dataKey="grandTotal" fill="#413ea0" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold pb-4">Overview</h2>
      <div className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="mb-8 sm:col-span-4">{renderChart("today")}</div>
        <div className="flex justify-strt mb-5 flex-col sm:col-span-2">
          <Target totals={totals} />
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Overview;
