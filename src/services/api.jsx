import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUserTotals = async (period) => {
  return await axios.get(
    `${API_URL}/users/user_totals?period=${period}`,
    getAuthHeader()
  );
};

// export const signupUser = async (userData) => {
//   return await axios.post(`${API_URL}/users/signup`, userData, {
//     headers: { "Content-Type": "application/json" },
//   });
// };

// export const loginUser = async (loginData) => {
//   return await axios.post(`${API_URL}/users/login`, loginData, {
//     headers: { "Content-Type": "application/json" },
//   });
// };

// export const createUser = async (newUser) => {
//   return await axios.post(`${API_URL}/admin/users`, newUser, getAuthHeader());
// };

// export const getUsers = async () => {
//   return await axios.get(`${API_URL}/admin/users`, getAuthHeader());
// };

// export const editUser = async (id, updatedUser) => {
//   return await axios.put(
//     `${API_URL}/admin/users/${id}`,
//     updatedUser,
//     getAuthHeader()
//   );
// };

// export const deleteUser = async (id) => {
//   return await axios.delete(`${API_URL}/admin/users/${id}`, getAuthHeader());
// };

// export const verifyUser = async (verificationData) => {
//   return await axios.post(
//     `${API_URL}/users/forgot_password`,
//     verificationData,
//     {
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// };

// export const updatePassword = async (passwordData) => {
//   return await axios.post(`${API_URL}/users/update_password`, passwordData, {
//     headers: { "Content-Type": "application/json" },
//   });
// };

// export const addRecord = async (recordData) => {
//   return await axios.post(
//     `${API_URL}/users/add_record`,
//     recordData,
//     getAuthHeader()
//   );
// };

// export const getRecords = async () => {
//   return await axios.get(`${API_URL}/users/get_records`, getAuthHeader());
// };

// export const getTotals = async () => {
//   return await axios.get(`${API_URL}/users/totals`, getAuthHeader());
// };

// export const getMonthlyTotals = async () => {
//   return await axios.get(`${API_URL}/users/monthly_totals`, getAuthHeader());
// };
