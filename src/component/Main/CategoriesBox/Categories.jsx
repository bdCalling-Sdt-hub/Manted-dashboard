import React, { useState } from "react";
import { Modal, Input, Upload, message, Pagination } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import categoryImage from "/public/category/category.png"; // Update this path as necessary
import { Link } from "react-router-dom";

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4); // Number of items per page
  const [categories, setCategories] = useState([
    { id: 1, name: "Real Estate", image: categoryImage },
    { id: 2, name: "Technology", image: categoryImage },
    { id: 3, name: "Health", image: categoryImage },
    { id: 4, name: "Education", image: categoryImage },
    { id: 5, name: "Finance", image: categoryImage },
    { id: 6, name: "Sports", image: categoryImage },
    { id: 7, name: "Lifestyle", image: categoryImage },
    { id: 8, name: "Food", image: categoryImage },
  ]);

  // Handle open modal for adding or editing
  const showModal = (edit = false, category = null) => {
    setIsEditing(edit);
    setIsModalVisible(true);
    if (edit) {
      setCategoryName(category.name); // Pre-fill for editing
      setImage(category.image); // Pre-fill image for editing
    } else {
      setCategoryName(""); // Clear fields for adding new category
      setImage(null); // Clear image for adding
    }
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setCategoryName(""); // Clear category name when modal is closed
    setImage(null); // Reset image
  };

  // Handle form submit for adding/editing category
  const handleSubmit = () => {
    if (!categoryName) {
      message.error("Please enter a category name!");
      return;
    }
    if (!image) {
      message.error("Please upload an image!");
      return;
    }

    if (isEditing) {
      // Update category
      const updatedCategories = categories.map((category) =>
        category.name === categoryName ? { ...category, name: categoryName, image: image } : category
      );
      setCategories(updatedCategories);
      message.success("Category edited successfully!");
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        name: categoryName,
        image: image,
      };
      setCategories([...categories, newCategory]);
      message.success("Category added successfully!");
    }

    handleCancel();
  };

  // Handle image upload
  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get categories for the current page
  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle category deletion
  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
    message.success("Category deleted successfully!");
  };

  return (
    <section>
      <div className="w-full md:flex justify-end items-center py-6">
        <button
          type="primary"
          className="px-2 md:px-5 py-3 bg-[#038c6d] text-white flex justify-center items-center gap-1 rounded text-sm md:mb-0"
          onClick={() => showModal(false)}
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {paginatedCategories.map((category) => (
          <div key={category.id} className="border-shadow pb-5 rounded-lg overflow-hidden">
            <img className="w-full max-h-[250px]" src={category.image} alt="Category" />
            <div>
              <h2 className="my-5 text-3xl font-semibold text-center">{category.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 px-5">
              <button
                className="w-full py-3 px-6 border border-[#038c6d] rounded-lg"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
              <button
                type="primary"
                className="w-full py-3 px-6 border bg-[#038c6d] text-white rounded-lg"
                onClick={() => showModal(true, category)}
              >
                Edit Category
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={categories.length}
          onChange={handlePageChange}
        />
      </div>

      {/* Modal for adding/editing category */}
      <Modal
        title={isEditing ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default cancel and ok buttons
      >
        <div className="my-5">
          <span className="mb-3 font-semibold text-base">Asset Category name</span>
          <Input
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="my-5 w-full">
          <span className="mb-3 font-semibold text-base block">Asset Category Image</span>
          <Upload
            customRequest={handleImageUpload}
            className="border-dashed border !w-full block border-gray-300 rounded-lg p-2"
            showUploadList={false}
            accept="image/*"
            beforeUpload={() => false} // Disable auto upload
          >
            <button className="block !w-full px-32" icon={<UploadOutlined />}>
              Upload Category Image
            </button>
          </Upload>
          {image && <div className="mt-2">Image uploaded successfully!</div>}
        </div>

        <button
          type="primary"
          className="w-full py-3 bg-[#038c6d] text-white rounded-lg"
          onClick={handleSubmit}
        >
          {isEditing ? "Update Category" : "Add Category"}
        </button>
      </Modal>
    </section>
  );
};

export default Categories;
