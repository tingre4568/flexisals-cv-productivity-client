import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [dob, setDob] = useState("");
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleVerify = async (values) => {
    const response = await fetch(
      "http://localhost:5000/api/users/forgot_password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    if (data.message === "User verified") {
      setVerified(true);
    } else {
      toast.error(data.message);
    }
  };

  const handleUpdatePassword = async (values) => {
    const response = await fetch(
      "http://localhost:5000/api/users/update_password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    toast.success(data.message);
  };

  return (
    <div className="flex w-full items-center min-h-full flex-1 flex-col justify-center px-6 my-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="./flexisales-logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 flex flex-col gap-4 w-full sm:mx-auto sm:w-full sm:max-w-sm">
        {!verified ? (
          <Form onFinish={handleVerify} className="space-y-6">
            <Form.Item
              name="employeeID"
              rules={[
                { required: true, message: "Please input your Employee ID!" },
              ]}
            >
              <Input
                placeholder="Employee ID"
                value={employeeID}
                type="number"
                onChange={(e) => setEmployeeID(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="dob"
              rules={[
                { required: true, message: "Please input your Date of Birth!" },
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
            <Form.Item>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify
              </button>
            </Form.Item>
          </Form>
        ) : (
          <Form onFinish={handleUpdatePassword} className="space-y-6">
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please input your New Password!" },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your New Password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
              </button>
            </Form.Item>
          </Form>
        )}
        <Form.Item>
          <NavLink
            to={"/signin"}
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Cancel
          </NavLink>
        </Form.Item>
      </div>
    </div>
  );
};

export default ForgotPassword;
