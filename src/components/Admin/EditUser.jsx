import React from "react";
import { useStateContext } from "../../context/StateContext";
import Dashboard from "../Dashboard/Dashboard";
import { Form, Input, Button, Radio } from "antd";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { users, setUsers, token, editUser, handleEditUser, setEditUser } =
    useStateContext();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  return (
    <Dashboard>
      <div className="flex w-full items-center min-h-full flex-1 flex-col justify-center px-6 mt-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit User
          </h2>
        </div>

        <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-sm">
          {editUser && (
            <Form
              form={form}
              layout="vertical"
              initialValues={editUser}
              onFinish={handleEditUser}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your Name!" },
                    ]}
                  >
                    <Input
                      placeholder="Name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </div>

                <div className="sm:col-span-6">
                  <Form.Item
                    name="employeeID"
                    label="Employee ID"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Employee ID!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Employee ID"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </div>

                <div className="sm:col-span-6">
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: false,
                        message: "Please input your Password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Password"
                      className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </div>

                <div className="sm:col-span-6">
                  <Form.Item
                    name="isAdmin"
                    label="Admin"
                    rules={[
                      {
                        required: true,
                        message: "Please select if user is Admin!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <div className="sm:col-span-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                  >
                    Save Changes
                  </Button>
                </div>

                <div className="sm:col-span-2">
                  <Button
                    type="link"
                    href="/admin/users-list"
                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default EditUser;
