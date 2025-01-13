import React, { useState } from "react";
import { Modal, Input, message, Pagination } from "antd";
import { FaPlus } from "react-icons/fa";
import categoryImage from "/public/category/category.png"; // Update this path as necessary

const Categories = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
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

  const showAddModal = () => {
    setCategoryName("");
    setImage(null);
    setIsAddModalVisible(true);
  };

  const showEditModal = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setImage(category.image);
    setIsEditModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    setCategoryName("");
    setImage(null);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setCategoryName("");
    setImage(null);
    setCurrentCategory(null);
  };

  const handleAddCategory = () => {
    if (!categoryName) {
      message.error("Please enter a category name!");
      return;
    }
    if (!image) {
      message.error("Please upload an image!");
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
      image: URL.createObjectURL(image),
    };

    setCategories([...categories, newCategory]);
    message.success("Category added successfully!");
    closeAddModal();
  };

  const handleEditCategory = () => {
    if (!categoryName) {
      message.error("Please enter a category name!");
      return;
    }
    if (!image) {
      message.error("Please upload an image!");
      return;
    }

    const updatedCategories = categories.map((category) =>
      category.id === currentCategory.id
        ? { ...category, name: categoryName, image: URL.createObjectURL(image) }
        : category
    );

    setCategories(updatedCategories);
    message.success("Category updated successfully!");
    closeEditModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
    message.success("Category deleted successfully!");
  };

  return (
    <section>
      <div className="w-full md:flex justify-end items-center py-6">
        <button
          className="px-2 md:px-5 py-3 text-xl bg-[#038c6d] text-white flex justify-center items-center gap-1 rounded md:mb-0"
          onClick={showAddModal}
        >
          <FaPlus className="text-xl font-semibold text-white" /> Add Category
        </button>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
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
                className="w-full py-3 px-6 border bg-[#038c6d] text-white rounded-lg"
                onClick={() => showEditModal(category)}
              >
                Edit Category
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={categories.length}
          onChange={handlePageChange}
        />
      </div>

      {/* Add Modal */}
      <Modal title="Add Category" visible={isAddModalVisible} onCancel={closeAddModal} footer={null}>
        <div className="my-5">
          <span className="mb-3 font-semibold text-base">Category Name</span>
          <Input
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="my-5 w-full">
          <span className="mb-3 font-semibold text-base block">Category Image</span>
          <input
            type="file"
            accept="image/*"
            className="block w-full border-dashed border-gray-300 rounded-lg p-2"
            onChange={handleFileChange}
          />
        </div>

        <button className="w-full py-3 bg-[#038c6d] text-white rounded-lg" onClick={handleAddCategory}>
          Add Category
        </button>
      </Modal>

      {/* Edit Modal */}
      <Modal title="Edit Category" visible={isEditModalVisible} onCancel={closeEditModal} footer={null}>
        <div className="my-5">
          <span className="mb-3 font-semibold text-base">Category Name</span>
          <Input
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="my-5 w-full">
          <span className="mb-3 font-semibold text-base block">Category Image</span>
          <input
            type="file"
            accept="image/*"
            className="block w-full border-dashed border-gray-300 rounded-lg p-2"
            onChange={handleFileChange}
          />
        </div>

        <button className="w-full py-3 bg-[#038c6d] text-white rounded-lg" onClick={handleEditCategory}>
          Update Category
        </button>
      </Modal>
    </section>
  );
};

export default Categories;
