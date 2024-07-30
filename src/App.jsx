import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useStateContext } from "./context/StateContext.jsx";
import AddUser from "./components/Admin/AddUser.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminUsersList from "./components/Admin/AdminUsersList.jsx";
import EditUser from "./components/Admin/EditUser.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import Login from "./components/Auth/Login.jsx";
import Home from "./components/Dashboard/Home.jsx";
import AddFile from "./components/User/AddFile.jsx";
import Productivity from "./components/User/Productivity.jsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { token } = useStateContext();

  return (
    <div>
      <Routes>
        <Route
          path="/signin"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={token ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/add-file"
          element={token ? <AddFile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/productivity"
          element={token ? <Productivity /> : <Navigate to="/signin" />}
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users-list" element={<AdminUsersList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="edit-user" element={<EditUser />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
