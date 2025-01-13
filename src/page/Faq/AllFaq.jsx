import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Modal, Button, Input, Form, notification } from 'antd';
import { FaPlus } from 'react-icons/fa';

const AllFaq = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [faqs, setFaqs] = useState([
        { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
        { question: "What is a hook in React?", answer: "A hook is a special function that lets you hook into React features." },
        // Add initial FAQ items if needed
    ]);

    const [form] = Form.useForm();  // Form reference for modal

    const showModal = () => {
        setIsModalVisible(true); // Open the modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close the modal
    };

    const handleAddFaq = (values) => {
        // Add the new FAQ to the list
        setFaqs([...faqs, { question: values.question, answer: values.answer }]);

        // Notify the user about successful addition
        notification.success({
            message: 'FAQ Added Successfully!',
        });

        // Close the modal after adding FAQ
        setIsModalVisible(false);
        form.resetFields();  // Reset the form fields
    };

    const handleDelete = (index) => {
        // Remove the FAQ at the given index
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(updatedFaqs);

        // Notify the user about successful deletion
        notification.success({
            message: 'FAQ Deleted Successfully!',
        });
    };

    return (
        <div>
            <div className='md:p-4 mt-5 sm:mt-0 flex items-center justify-between'>
                <Link to={"/settings"} className="flex items-center cursor-pointer ml-6 my-8">
                    <MdOutlineKeyboardArrowLeft size={30} />
                    <h1 className="text-xl font-medium ml-2">FAQ</h1>
                </Link>
                <div>
                    <button
                        className="bg-[#038c6d] text-white px-10 py-3 text-xl rounded-lg flex items-center gap-2"
                        onClick={showModal} // Open modal when clicking the button
                    >
                       <FaPlus className='text-xl font-semibold text-white' /> Add FAQ
                    </button>
                </div>
            </div>

            {/* List of FAQs */}
            <div className="mt-5 md:px-8 px-3">
                {/* <h2 className="text-2xl font-medium">All FAQs</h2> */}
                <div className="my-5 ">
                    <div>
                        {faqs.map((faq, index) => (
                            <div key={index} className=" flex items-center justify-between border-b py-10">
                                <div>
                                    <p className="font-medium text-lg">{faq.question}</p>
                                    <p>{faq.answer}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(index)} // Call delete function on button click
                                        className='bg-[#dd1811] text-white md:px-10 px-6 py-3 rounded-lg'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for adding FAQ */}
            <Modal
                title="Add New FAQ"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleAddFaq}
                    layout="vertical"
                    initialValues={{ question: '', answer: '' }}
                >
                    <Form.Item
                        name="question"
                        label="Question"
                        rules={[{ required: true, message: 'Please enter the question!' }]}
                    >
                        <Input placeholder="Enter the question" />
                    </Form.Item>
                    <Form.Item
                        name="answer"
                        label="Answer"
                        rules={[{ required: true, message: 'Please enter the answer!' }]}
                    >
                        <Input.TextArea placeholder="Enter the answer" rows={4} />
                    </Form.Item>

                    <div className="flex justify-end gap-4">
                        <Button onClick={handleCancel} className="bg-gray-400 text-white ">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" className="bg-[#038c6d] text-white ">
                            Add FAQ
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AllFaq;
