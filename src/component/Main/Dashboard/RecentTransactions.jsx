import { ConfigProvider, Table, Pagination, Space, message } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import moment from "moment";
import { useBlockUserMutation, useUnBlockUserMutation } from "../../../redux/features/user/userApi";

const RecentTransactions = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(5); // Items per page

  const { data: userData, isLoading } = useGetDashboardStatusQuery();

  const recentUsers = userData?.recentUsers;
  console.log(recentUsers);

  const data = [
    {
      id: 1,
      accountID: 2010,
      image: { url: "https://randomuser.me/api/portraits/men/1.jpg" },
      transactionId: "TRX001",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      email: "doe@example.com",
      phone: "123-456-7890",
      location: "US , New-wark",
      date: "2023-11-01",
    },
    {
      id: 2,
      accountID: 2010,
      image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
      transactionId: "TRX002",
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "US , New-wark",
      date: "2023-10-25",
    },
    {
      id: 3,
      accountID: 2010,
      image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
      transactionId: "TRX002",
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "US , New-wark",
      date: "2023-10-25",
    },
    // More data
  ];

  const [userBlock] = useBlockUserMutation();
  const [userUnBlock] = useUnBlockUserMutation();

  // console.log(id);

  const handleUserRemove = async () => {

    try {

      const res = await userBlock(id);

      console.log(res);
      if (res.error) {
        message.error(res.error.data.message);
      }
      if (res.data) {
        message.success(res.data.message);
      }

    } catch (error) {
      message.error("Something went wrong");
    }

  };

  const handleUserUnBlock = async () => {
    try {

      const res = await userUnBlock(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: "#SL",
      dataIndex: "si",
      key: "si",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex flex-row justify-center">

          <button
            onClick={() => handleDelete(record)}
            style={{
              fontSize: "14px",
              color: "#fff",
              background: "#e74c3c",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </Space>
      ),
    },
  ];

  const filteredData = recentUsers?.filter((user) => {
    const matchesText =
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = selectedDate
      ? user.date === selectedDate.format("YYYY-MM-DD")
      : true;

    return matchesText && matchesDate;
  });

  const dataSource = filteredData?.map((user, index) => ({
    key: user.id,
    si: index + 1,
    userName: `${user?.fullName}`,
    email: user.email,
    role: user.role,
    joinDate: user.createdAt.split(",")[0],
  }));

  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg">
      <div className="flex items-center justify-between flex-wrap my-10">
        <h1 className="text-2xl  flex items-center ">Recent User</h1>
      </div>

      {/* Table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#92b8c0",
              headerColor: "#000",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false} // Disable pagination in the table to handle it manually
          scroll={{ x: 500 }}
          className="text-center"
        />
      </ConfigProvider>

      {/* Custom Pagination Component */}
      <div className="flex justify-center my-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData?.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
          pageSizeOptions={[5, 10, 20]}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }} // Custom style for centering
        />
      </div>
    </div>
  );
};

export default RecentTransactions;
