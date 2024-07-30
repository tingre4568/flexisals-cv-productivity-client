// import { Table } from "antd";
// import Dashboard from "../Dashboard/Dashboard";

// import { useStateContext } from "../../context/StateContext";

// const UserList = () => {
//   const { monthlyTotals } = useStateContext();
//   console.log("monthlyTotals: ", monthlyTotals);

//   const columns = [
//     {
//       title: "Employee ID",
//       dataIndex: "employeeID",
//       key: "employeeID",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Company IVR",
//       dataIndex: "companyIVR",
//       key: "companyIVR",
//     },
//     {
//       title: "RPC VM",
//       dataIndex: "rpcVM",
//       key: "rpcVM",
//     },
//     {
//       title: "Direct Dial",
//       dataIndex: "directDial",
//       key: "directDial",
//     },
//     {
//       title: "Not Verified",
//       dataIndex: "notVerified",
//       key: "notVerified",
//     },
//     {
//       title: "Grand Total",
//       dataIndex: "grandTotal",
//       key: "grandTotal",
//     },
//     {
//       title: "Percentage",
//       dataIndex: "percentage",
//       key: "percentage",
//       render: (text) => (text || text === 0 ? `${text.toFixed(2)}%` : 0),
//     },
//     {
//       title: "Productivity",
//       dataIndex: "productivity",
//       key: "productivity",
//       render: (text) => (text || text === 0 ? text.toFixed(2) : 0),
//     },
//   ];

//   return (
//     <Dashboard>
//       <h2 className="text-2xl font-semibold pb-4">
//         Users Monthly Productivity
//       </h2>
//       <Table
//         columns={columns}
//         dataSource={monthlyTotals}
//         rowKey="employeeID"
//         pagination={false}
//       />
//     </Dashboard>
//   );
// };

// export default UserList;
