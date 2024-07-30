import { message, theme } from "antd";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [loggedInUserName, setLoggedInUserName] = useState(
    localStorage.getItem("name")
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [collapsed, setCollapsed] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [totals, setTotals] = useState({});
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
    setLoggedInUserName(localStorage.getItem("name"));
  }, []);

  const fetchTotals = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/totals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotals(data);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const fetchRecords = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/get_records",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (Array.isArray(data)) {
        const groupedData = data.reduce((acc, record) => {
          const date = new Date(record.date).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(record);
          return acc;
        }, {});
        const formattedData = Object.keys(groupedData).map((date) => ({
          date,
          records: groupedData[date],
          companyIVR: groupedData[date].reduce(
            (acc, rec) => acc + rec.companyIVR,
            0
          ),
          directDial: groupedData[date].reduce(
            (acc, rec) => acc + rec.directDial,
            0
          ),
          rpcVM: groupedData[date].reduce((acc, rec) => acc + rec.rpcVM, 0),
          notVerified: groupedData[date].reduce(
            (acc, rec) => acc + rec.notVerified,
            0
          ),
        }));
        setRecords(formattedData);
      } else {
        console.error("Data is not an array:", data);
        setRecords([]);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOk = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/update_record/${currentRecord._id}`,
        currentRecord,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "Record updated successfully") {
        message.success("Record updated successfully");
        setIsEditModalVisible(false);
        await fetchRecords();
        await fetchTotals();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Error updating record:", error);
    }
  };

  const handleEditUser = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/admin/users/${editUser._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(users.map((user) => (user._id === editUser._id ? data : user)));
      setEditUser(null);
      navigate("/admin/users-list");
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchMonthlyTotals();
  }, [token]);

  const handleDeleteConfirm = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/delete_record/${recordToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "Record deleted successfully") {
        message.success("Record deleted successfully");
        await fetchTotals();
        await fetchRecords();
      } else {
        message.error(data.message || "Unknown error occurred");
      }
    } catch (error) {
      message.error(`Error deleting record: ${error.message}`);
    } finally {
      setIsDeleteModalVisible(false);
      setRecordToDelete(null);
    }
  };

  const fetchMonthlyTotals = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/monthly_totals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data: ", data);
      if (Array.isArray(data)) {
        setMonthlyTotals(data);
      } else {
        console.error("Data is not an array:", data);
        setMonthlyTotals([]);
      }
    } catch (error) {
      console.error("Error fetching monthly totals:", error);
    }
  };

  const handleAddUser = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      navigate("/admin/users-list");
    } catch (error) {
      toast.error(error.response?.data.message || "Error submitting form");
    }
  };

  const handleLogin = async (values) => {
    const { employeeID, password, rememberMe } = values;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { employeeID, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("isAdmin", data.isAdmin);
        setToken(data.token);
        setLoggedInUserName(data.name);
        setIsAdmin(data.isAdmin);

        if (rememberMe) {
          localStorage.setItem("rememberedEmployeeID", employeeID);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmployeeID");
          localStorage.removeItem("rememberedPassword");
        }
        toast.success(`Login successful...!`);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error logging in");
    }
  };

  const handleAddFile = async (values) => {
    const { date, fileName, companyIVR, directDial, rpcVM, notVerified } =
      values;
    const response = await fetch("http://localhost:5000/api/users/add_record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date,
        fileName,
        companyIVR,
        directDial,
        rpcVM,
        notVerified,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      fetchRecords();
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <StateContext.Provider
      value={{
        handleEditUser,
        handleAddFile,
        fetchMonthlyTotals,
        fetchTotals,
        handleLogin,
        handleAddUser,
        handleDeleteConfirm,
        loading,
        setLoading,
        handleEditOk,
        fetchRecords,
        currentRecord,
        setCurrentRecord,
        recordToDelete,
        setRecordToDelete,
        records,
        setRecords,
        totals,
        setTotals,
        monthlyTotals,
        setMonthlyTotals,
        isEditModalVisible,
        setIsEditModalVisible,
        isDeleteModalVisible,
        setIsDeleteModalVisible,
        users,
        setUsers,
        editUser,
        setEditUser,
        token,
        setToken,
        loggedInUserName,
        setLoggedInUserName,
        isAdmin,
        setIsAdmin,
        collapsed,
        setCollapsed,
        colorBgContainer,
        borderRadiusLG,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
