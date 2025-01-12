/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker, Button } from "antd";
import moment from "moment";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const { Item } = Form;

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [params] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const { data, isFetching, isError, error } = useGetAllUsersQuery(params);

  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      accountID: 2010,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      address_line1: "123 Main St, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/1.jpg" },
      phone: "123-456-7890",
      createdAt: "2024-01-01T10:00:00",
      status: "Only Registered",
    },
    {
      id: 2,
      accountID: 2010,
      firstName: "Jane",
      lastName: "Smith",
      gender: "Male",
      email: "janesmith@example.com",
      address_line1: "456 Oak Ave, Springfield",
      image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
      phone: "234-567-8901",
      createdAt: "2024-02-01T11:00:00",
      status: "Subscribers",
    },
  ]);

  const handleView = (record) => {
    alert(`View user details: ${record.firstName} ${record.lastName}`);
  };

  const handleDelete = (record) => {
    alert(`Delete user: ${record.firstName} ${record.lastName}`);
  };

  const dataSource = allUsers?.map((user, index) => ({
    id: user.id,
    si: index + 1,
    firstName: user?.firstName,
    lastName: user?.lastName,
    accountID: user?.accountID,
    email: user?.email,
    phone: user?.phone,
    address_line1: user?.address_line1,
    createdAt: user?.createdAt,
    imageUrl: user?.image?.url,
    status: user?.status,
    gender: user?.gender,
  }));

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "Account ID",
      dataIndex: "accountID",
      key: "accountID",
      render: (_, record) => <span>{record.accountID}</span>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Link to={`/users/${record.id}`}>
            <GoInfo className="text-2xl" />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isError && error) {
      setAllUser([]);
    } else if (data) {
      setAllUser(data?.data?.attributes?.user?.results);
    }
  }, [data, isError, error]);

  return (
    <section>
      <div className="md:flex justify-between items-center py-6  mb-4">
        <Link to={"/users"} className="text-2xl  flex items-center ">
          <FaAngleLeft /> User List
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#92b8c0]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#92b8c0]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <button className="size-8 rounded-full flex justify-center items-center bg-[#92b8c0] text-black">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>
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
          loading={isFetching}
          pagination={{
            position: ["bottomCenter"], // Moves the pagination to the center
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          responsive={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        />

      </ConfigProvider>
    </section>
  );
};

export default Users;
