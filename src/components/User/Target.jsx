import { Progress } from "antd";

const Target = ({ totals }) => {
  const monthlyData = totals.month || {};
  const totalDirectDialRPCVM =
    (monthlyData.directDial || 0) + (monthlyData.rpcVM || 0);
  const targetDirectDialRPCVM = 1000;
  const targetCompanyIVR = 2000;

  const progressDirectDialRPCVM =
    (totalDirectDialRPCVM / targetDirectDialRPCVM) * 100;
  const progressCompanyIVR =
    ((monthlyData.companyIVR || 0) / targetCompanyIVR) * 100;

  return (
    <div>
      <h3 className="text-xl font-semibold pb-4">Monthly Target</h3>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Direct Dial + RPC VM</h4>
        <Progress
          percent={progressDirectDialRPCVM}
          format={(percent) =>
            `${totalDirectDialRPCVM}/${targetDirectDialRPCVM}`
          }
          // height="5px"
          strokeColor="#52c41a"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold">Company IVR</h4>
        <Progress
          percent={progressCompanyIVR}
          format={(percent) =>
            `${monthlyData.companyIVR || 0}/${targetCompanyIVR}`
          }
          strokeColor="#1890ff"
        />
      </div>
    </div>
  );
};

export default Target;
