import { Button, Form, Input, Modal, Spin, Table } from "antd";
import { useStateContext } from "../../context/StateContext";
import DeleteModal from "../Reusable/DeleteModal";

const FilesList = () => {
  const {
    token,
    handleEditOk,
    handleDeleteConfirm,
    fetchRecords,
    records,
    recordToDelete,
    setRecordToDelete,
    loading,
    setIsDeleteModalVisible,
    setIsEditModalVisible,
    setCurrentRecord,
    isEditModalVisible,
    currentRecord,
    isDeleteModalVisible,
  } = useStateContext();

  const handleEdit = (record) => {
    const formattedRecord = {
      ...record,
      date: new Date(record.date).toISOString().split("T")[0],
    };
    setCurrentRecord(formattedRecord);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
  };

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (text) => dateFormatter.format(new Date(text)),
      },
      {
        title: "File Name",
        dataIndex: "fileName",
        key: "fileName",
      },
      {
        title: "Company IVR",
        dataIndex: "companyIVR",
        key: "companyIVR",
      },
      {
        title: "Direct Dial",
        dataIndex: "directDial",
        key: "directDial",
      },
      {
        title: "RPC VM",
        dataIndex: "rpcVM",
        key: "rpcVM",
      },
      {
        title: "Not Verified",
        dataIndex: "notVerified",
        key: "notVerified",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <div className="flex gap-3">
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.records}
        pagination={false}
        rowKey={(rec) => rec.fileName}
      />
    );
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => dateFormatter.format(new Date(text)),
    },
    {
      title: "Company IVR",
      dataIndex: "companyIVR",
      key: "companyIVR",
    },
    {
      title: "Direct Dial",
      dataIndex: "directDial",
      key: "directDial",
    },
    {
      title: "RPC VM",
      dataIndex: "rpcVM",
      key: "rpcVM",
    },
    {
      title: "Not Verified",
      dataIndex: "notVerified",
      key: "notVerified",
    },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold pb-4">Files List</h2>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={records}
        rowKey={(record) => record.date}
        pagination={{ pageSize: 10 }}
        rowClassName={(record) =>
          record.directDial + record.rpcVM >= 50 ? "green-row" : "red-row"
        }
      />
      <Modal
        title="Edit Record"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        okText="Update"
        onCancel={handleEditCancel}
      >
        <Form
          layout="vertical"
          initialValues={currentRecord}
          onValuesChange={(changedValues) =>
            setCurrentRecord({ ...currentRecord, ...changedValues })
          }
        >
          <div className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <Form.Item label="Date" name="date">
                <Input type="date" />
              </Form.Item>
            </div>
            <div className="sm:col-span-6">
              <Form.Item label="File Name" name="fileName">
                <Input />
              </Form.Item>
            </div>
            <div className="sm:col-span-3">
              <Form.Item label="Company IVR" name="companyIVR">
                <Input />
              </Form.Item>
            </div>
            <div className="sm:col-span-3">
              <Form.Item label="Direct Dial" name="directDial">
                <Input />
              </Form.Item>
            </div>
            <div className="sm:col-span-3">
              <Form.Item label="RPC VM" name="rpcVM">
                <Input />
              </Form.Item>
            </div>
            <div className="sm:col-span-3">
              <Form.Item label="Not Verified" name="notVerified">
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <DeleteModal
        isOpen={isDeleteModalVisible}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this file?</p>
      </DeleteModal>
    </div>
  );
};

export default FilesList;
