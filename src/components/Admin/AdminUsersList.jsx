import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import Dashboard from "../Dashboard/Dashboard";
import DeleteModal from "../Reusable/DeleteModal";

const AdminUsersList = () => {
  const { token, users, setUsers, setEditUser } = useStateContext();
  const navigate = useNavigate();

  // State for managing the delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) =>
          a.employeeID.localeCompare(b.employeeID)
        );
        setUsers(sortedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [token, setUsers]);

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/admin/users/${userToDelete._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setUsers(users.filter((user) => user._id !== userToDelete._id));
        handleCloseDeleteModal(); // Close the modal after deletion
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    navigate("/admin/edit-user");
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeID",
      key: "employeeID",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <Tag color={isAdmin ? "green" : "red"}>{isAdmin ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, user) => (
        <div>
          <Button type="link" onClick={() => handleEditUser(user)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleOpenDeleteModal(user)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Dashboard>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold pb-4">Users List</h2>
          <Button type="primary" onClick={() => navigate("/admin/add-user")}>
            Add User
          </Button>
        </div>
        <Table
          dataSource={users}
          columns={columns}
          rowKey={(user) => user._id}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
        >
          <p>Are you sure you want to delete {userToDelete?.name}?</p>
        </DeleteModal>
      </div>
    </Dashboard>
  );
};

export default AdminUsersList;
