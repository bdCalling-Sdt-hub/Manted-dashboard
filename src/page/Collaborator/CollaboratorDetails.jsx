 

import { message } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CollaboratorDetails = () => {


  const handleCollaboratorRemove = () => {
    message.success("Collaborator Removed successfully!");
  };

  return (
    <div>
      <Link to={"/collaborator"} className="text-2xl flex items-center mt-5">
        <FaAngleLeft /> Collaborator Details
      </Link>

      <div className="my-10 w-full md:w-2/4 mx-auto">
        {/* User Profile Section */}
        <div className="flex items-center justify-between gap-5 mb-5">
          <div className="flex items-center gap-5">
            <img
              className="w-24 h-24 rounded-full"
              src="../../../public/logo/userimage.png"
              alt="User"
            />
            <h1 className="text-2xl font-semibold">Md. Nerob</h1>
          </div>
          <div className="flex items-center gap-5">
            <Link to={"/collaborator"} className="border border-[#91838342] px-5 py-2 rounded-lg">Cancel</Link>
            <button onClick={handleCollaboratorRemove} className="bg-[#e74c3c] text-white px-5 py-2 rounded-lg">Remove</button>
          </div>
        </div>

        {/* User Details Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Name</span>
            <span>Alax Deo</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Email</span>
            <span>demo@gmail.com</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">City</span>
            <span>Anchorage</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">State</span>
            <span>Alaska</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Country</span>
            <span>USA</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Club Name</span>
            <span>Over 21</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Club Handicap</span>
            <span>15</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">User Type</span>
            <span>User</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Joining Date</span>
            <span>16 Dec 2024</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CollaboratorDetails;
