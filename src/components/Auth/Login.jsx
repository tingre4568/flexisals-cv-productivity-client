import { Button, Checkbox, Form, Input, Typography } from "antd";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setToken, setIsAdmin, handleLogin } = useStateContext();

  useEffect(() => {
    const rememberedEmployeeID = localStorage.getItem("rememberedEmployeeID");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmployeeID && rememberedPassword) {
      form.setFieldsValue({
        employeeID: rememberedEmployeeID,
        password: rememberedPassword,
        rememberMe: true,
      });
    }
  }, [form]);

  return (
    <div className="flex w-full items-center min-h-full flex-1 flex-col justify-center px-6 py-12 my-12 lg:px-8 lg:my-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="flexisales"
          src="./flexisales-logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to contact verification
        </h2>
      </div>

      <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          form={form}
          className="space-y-6"
          initialValues={{
            rememberMe: false,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="employeeID"
            rules={[
              { required: true, message: "Please input your Employee ID!" },
            ]}
          >
            <Input
              placeholder="Employee ID"
              type="number"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <div className="flex items-center justify-between">
              <Checkbox>Remember me</Checkbox>
              <NavLink
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </NavLink>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
