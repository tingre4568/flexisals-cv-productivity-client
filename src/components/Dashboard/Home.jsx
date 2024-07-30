import { UploadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import FilesList from "../User/FilesList";
import Dashboard from "./Dashboard";
import Overview from "../User/Overview";

const Home = () => {
  const { token } = useStateContext();

  return (
    <>
      <Dashboard>
        {token && (
          <div className="flex justify-end p-5">
            <NavLink
              to={"/add-file"}
              className="flex items-center w-[150px] justify-evenly rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add File <UploadOutlined />
            </NavLink>
          </div>
        )}
        <div className="flex flex-col gap-10">
          <div>
            <Overview />
          </div>
          <div>
            <FilesList />
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Home;
