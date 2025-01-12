import { Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data
  const notifications = [
    { id: 1, message: "You have a new order delivery for Luke.", time: "2 Min Ago" },
    { id: 2, message: "You have shipment 5 days for Luke.", time: "2 Min Ago" },
    { id: 3, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 4, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 5, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 6, message: "You have a new message from Luke.", time: "2 Min Ago" },
    { id: 7, message: "You have shipment 5 days for Luke.", time: "2 Min Ago" },
    { id: 8, message: "You have a new order delivery for Luke.", time: "2 Min Ago" },
  ];

  const pageSize = 5;

  // Pagination Logic
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4"><FaAngleLeft /> Notification</Link>

      <div className="space-y-4">
        {paginatedNotifications.map((item) => (
          <div key={item.id} className="border border-[#84df91] hover:bg-[#84df9256] cursor-pointer rounded-md p-4 flex items-center space-x-4">
            <div className="text-[#84df91] border border-[#84df91] rounded-full p-2">
              <span className=" bg-[#84df91] p-1.5 rounded-full absolute ml-4 z-20"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item.message}</p>
              <p className="text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={notifications.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
