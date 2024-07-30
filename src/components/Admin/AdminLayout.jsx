import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext.jsx";

const AdminLayout = () => {
  const { token, isAdmin } = useStateContext();

  if (!token || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
