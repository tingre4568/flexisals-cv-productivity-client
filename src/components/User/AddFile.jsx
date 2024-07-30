import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import Dashboard from "../Dashboard/Dashboard";

const AddFile = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fileName, setFileName] = useState("");
  const [companyIVR, setCompanyIVR] = useState(0);
  const [directDial, setDirectDial] = useState(0);
  const [rpcVM, setRpcVM] = useState(0);
  const [notVerified, setNotVerified] = useState(0);
  const { handleAddFile } = useStateContext();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const validatePositiveNumber = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Value must be a positive number!"));
    }
    return Promise.resolve();
  };

  return (
    <Dashboard>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add a new file
        </h2>
      </div>
      <div className="flex w-full items-center min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="mt-0 w-full sm:mx-auto sm:w-full sm:max-w-lg">
          <Form
            className="space-y-3"
            onFinish={(values) => handleAddFile({ ...values, date })}
          >
            <div className="border-b border-gray-900/10 ">
              <div className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <Form.Item
                      name="date"
                      initialValue={date}
                      rules={[
                        { required: true, message: "Please input the Date!" },
                      ]}
                    >
                      <Input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="fileName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    File Name
                  </label>
                  <div className="mt-2">
                    <Form.Item
                      name="fileName"
                      rules={[
                        {
                          required: true,
                          message: "Please input the File Name!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="File Name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="companyIVR"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company IVR
                  </label>
                  <div className="mt-2">
                    <Form.Item
                      name="companyIVR"
                      initialValue={companyIVR}
                      rules={[
                        {
                          required: true,
                          message: "Please input the Company IVR!",
                        },
                        { validator: validatePositiveNumber },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Company IVR"
                        value={companyIVR}
                        onChange={(e) => setCompanyIVR(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="rpcVM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    RPC VM
                  </label>
                  <div className="mt-2">
                    <Form.Item
                      name="rpcVM"
                      initialValue={rpcVM}
                      rules={[
                        { required: true, message: "Please input the RPC VM!" },
                        { validator: validatePositiveNumber },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="RPC VM"
                        value={rpcVM}
                        onChange={(e) => setRpcVM(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="directDial"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Direct Dial
                  </label>
                  <div className="mt-2">
                    <Form.Item
                      name="directDial"
                      initialValue={directDial}
                      rules={[
                        {
                          required: true,
                          message: "Please input the Direct Dial!",
                        },
                        { validator: validatePositiveNumber },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Direct Dial"
                        value={directDial}
                        onChange={(e) => setDirectDial(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="notVerified"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Not Verified
                  </label>
                  <div className="mt-2">
                    <Form.Item
                      name="notVerified"
                      initialValue={notVerified}
                      rules={[
                        {
                          required: true,
                          message: "Please input the Not Verified count!",
                        },
                        { validator: validatePositiveNumber },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Not Verified"
                        value={notVerified}
                        onChange={(e) => setNotVerified(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <Form.Item>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Record
                    </button>
                  </Form.Item>
                </div>
                <div className="sm:col-span-2">
                  <Form.Item>
                    <NavLink
                      to={"/"}
                      className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Cancel
                    </NavLink>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Dashboard>
  );
};

export default AddFile;
