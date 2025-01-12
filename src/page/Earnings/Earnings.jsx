import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Modal, Pagination } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { jsPDF } from "jspdf"; // Import jsPDF

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const data = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", location: "New York, USA", date: "2024-01-01" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", location: "London, UK", date: "2024-02-01" },
    { id: 3, name: "Mike Brown", email: "mike.brown@example.com", location: "Paris, France", date: "2024-03-01" },
    { id: 4, name: "Alice Johnson", email: "alice.johnson@example.com", location: "Sydney, Australia", date: "2024-04-01" },
    { id: 5, name: "Tom Harris", email: "tom.harris@example.com", location: "Berlin, Germany", date: "2024-05-01" },
    { id: 6, name: "Mary White", email: "mary.white@example.com", location: "Toronto, Canada", date: "2024-06-01" },
    { id: 7, name: "David Green", email: "david.green@example.com", location: "Los Angeles, USA", date: "2024-07-01" },
  ];

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const downloadPDF = () => {
    const doc = new jsPDF();

    if (selectedTransaction) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Transaction Details", 14, 20);
      doc.setFontSize(12);

      const lineHeight = 10;
      const padding = 6;
      const leftMargin = 10;

      // Add a box for the transaction details
      const detailsStartY = 30;
      doc.rect(leftMargin, detailsStartY, 190, 90); // Box around details
      doc.text(`Transaction ID: #12345678`, leftMargin + padding, detailsStartY + padding);
      doc.text(`User Name: ${selectedTransaction.name}`, leftMargin + padding, detailsStartY + padding * 2);
      doc.text(`Address: ${selectedTransaction.location}`, leftMargin + padding, detailsStartY + padding * 3);
      doc.text(`Date: ${selectedTransaction.date}`, leftMargin + padding, detailsStartY + padding * 4);
      doc.text(`A/C Number: **** **** **** *545`, leftMargin + padding, detailsStartY + padding * 5);
      doc.text(`Withdraw Amount: $2.99`, leftMargin + padding, detailsStartY + padding * 6);
      doc.text(`Subscription Type: Basic`, leftMargin + padding, detailsStartY + padding * 7);

      // Add a line after transaction details
      doc.line(leftMargin, detailsStartY + 90, 200, detailsStartY + 90);

      // Additional design for spacing between text
      const textSpacing = 12;

      doc.text("Thank you for using our service!", leftMargin, detailsStartY + 100);
      doc.text("If you have any questions, feel free to contact us.", leftMargin, detailsStartY + 110);

      doc.save("transaction-details.pdf"); // Save the PDF
    }
  };


  // Function to print modal content only with enhanced design
  const printTable = () => {
    if (selectedTransaction) {
      const printWindow = window.open("", "", "width=800,height=600");
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.5;
                padding: 20px;
                font-size: 16px;
              }
              h2 {
                color: #038c6d;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .transaction-details {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin-top: 20px;
              }
              .transaction-details p {
                margin: 10px 0;
              }
              .transaction-details p strong {
                color: #038c6d;
              }
            </style>
          </head>
          <body>
            <h2>Transaction Details</h2>
            <div class="transaction-details">
              <p><strong>Transaction ID:</strong> #12345678</p>
              <p><strong>User Name:</strong> ${selectedTransaction.name}</p>
              <p><strong>Address:</strong> ${selectedTransaction.location}</p>
              <p><strong>Date:</strong> ${selectedTransaction.date}</p>
              <p><strong>A/C Number:</strong> **** **** **** *545</p>
              <p><strong>Withdraw Amount:</strong> $2.99</p>
              <p><strong>Subscription Type:</strong> Basic</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="w-full p-5">
      <div className="w-full md:flex justify-between items-center py-6">
        <h1 className="text-2xl flex items-center">
          <FaAngleLeft /> Earnings
        </h1>
        <div className="flex items-center gap-2">
          <input type="date" className="border border-gray-300 px-4 py-2 rounded-md mr-2" />
          <input
            type="text"
            name="UserName"
            className="border border-gray-300 px-4 py-2 rounded-md mr-2"
            placeholder="User Name"
          />
          <button className="bg-[#038c6d] text-white w-10 h-10 flex items-center justify-center rounded-md ml-2">
            <IoSearchOutline />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border-[#92b8c0]">
        <thead className="bg-[#92b8c0]">
          <tr>
            <th className="border-gray-300 px-4 py-2 text-left">#SL</th>
            <th className="border-gray-300 px-4 py-2 text-left">User Name</th>
            <th className="border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border-gray-300 px-4 py-2 text-left">Location</th>
            <th className="border-gray-300 px-4 py-2 text-left">Join Date</th>
            <th className="border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="border-gray-300 px-4 py-2">{(currentPage - 1) * pageSize + index + 1}</td>
              <td className="border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border-gray-300 px-4 py-2">{row.email}</td>
              <td className="border-gray-300 px-4 py-2">{row.location}</td>
              <td className="border-gray-300 px-4 py-2">{row.date}</td>
              <td className="border-gray-300 px-4 py-2">
                <div onClick={() => showModal(row)} className="cursor-pointer">
                  <HiOutlineDotsHorizontal className="text-2xl font-semibold" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Modal for transaction details */}
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        {selectedTransaction && (
          <div className="text-black">
            <h2 className="text-2xl font-semibold mb-4 text-center">Transaction Details</h2>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>Transaction ID:</strong> #12345678
            </p>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>User Name:</strong> {selectedTransaction.name}
            </p>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>Address:</strong> {selectedTransaction.location}
            </p>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>Date:</strong> {selectedTransaction.date}
            </p>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>A/C Number:</strong> **** **** **** *545
            </p>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>Withdraw Amount:</strong> $2.99
            </p>

            <p className="flex items-center justify-between py-3 border-b">
              <strong>Subscription Type:</strong> Basic
            </p>

            <div className="flex gap-3 mt-4">
              <button onClick={downloadPDF} className="border border-[#92b8c0] w-[50%] px-4 py-2 rounded text-black font-semibold">
                Download
              </button>
              <button onClick={printTable} className="bg-[#84df91] text-white w-[50%] px-4 py-2 rounded font-semibold">
                Print
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Earnings;
