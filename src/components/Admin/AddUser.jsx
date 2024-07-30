import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "../Dashboard/Dashboard";
import { useStateContext } from "../../context/StateContext";

const AddUser = () => {
  const [name, setName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const { handleAddUser } = useStateContext();

  return (
    <Dashboard>
      <div className="flex w-full items-center min-h-full flex-1 flex-col justify-center px-6 mt-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="flexisales"
            src="../flexisales-logo.png"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add user to contact verification
          </h2>
        </div>

        <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" onFinish={handleAddUser}>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Form.Item
                  name="employeeID"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Employee ID!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Employee ID"
                    type="number"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-3">
                <Form.Item
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Date of Birth!",
                    },
                  ]}
                >
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-6">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>

              <div className="sm:col-span-6">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-6">
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your Password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>
              <div className="sm:col-span-4">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add User
                  </Button>
                </Form.Item>
              </div>
              <div className="sm:col-span-2">
                <Form.Item>
                  <NavLink
                    to={"/admin/users-list"}
                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Cancel
                  </NavLink>
                </Form.Item>
              </div>
            </div>
          </Form>
          {/* <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </NavLink>
          </p> */}
        </div>
      </div>
    </Dashboard>
  );
};

export default AddUser;
