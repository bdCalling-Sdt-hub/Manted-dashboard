import React, { useState } from 'react';
import { Modal, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import subscriptionImage from '/public/category/category.png'; // You can replace with actual image for subscriptions
import { FaPlus } from 'react-icons/fa';

const Subscription = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Fake data for subscriptions
    const subscriptions = [
        {
            id: 1,
            name: 'Weekly Plan',
            price: '$5.50/week',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: subscriptionImage,
        },
        {
            id: 2,
            name: 'Monthly Plan',
            price: '$20/month',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: subscriptionImage,
        },
        {
            id: 3,
            name: 'Yearly Plan',
            price: '$200/year',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: subscriptionImage,
        },
    ];

    // Handle open modal for adding or editing
    const showModal = (edit = false, subscription = {}) => {
        setIsEditing(edit);
        setIsModalVisible(true);
        if (edit) {
            setSubscriptionName(subscription.name);
            setPrice(subscription.price);
            setDescription(subscription.description);
            setImage(subscription.image); // Pre-fill for editing
        } else {
            setSubscriptionName('');
            setPrice('');
            setDescription('');
            setImage(null); // Clear fields for adding new subscription
        }
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSubscriptionName('');
        setPrice('');
        setDescription('');
        setImage(null);
    };

    // Handle form submit for adding/editing subscription
    const handleSubmit = () => {
        if (!subscriptionName || !price || !description) {
            message.error('Please fill all fields!');
            return;
        }

        message.success(isEditing ? 'Subscription updated successfully!' : 'Subscription added successfully!');
        handleCancel();
    };

    // Handle image upload
    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setImage(info.file.originFileObj);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <section>
            <div className="w-full md:flex justify-end items-center py-6">
                <button
                    type="primary"
                    className=" text-xl px-2 md:px-5 py-3 bg-[#038c6d] text-white flex justify-center items-center gap-1 rounded md:mb-0"
                    onClick={() => showModal(false)}
                >
                    <FaPlus className='text-xl font-semibold text-white' />  Add Subscription
                </button>
            </div>

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="border-shadow pb-5 rounded-lg overflow-hidden">
                        <div>
                            <h2 className="my-5 text-3xl font-semibold text-center">{subscription.name}</h2>
                            <p className="text-center text-xl">{subscription.price}</p>
                            <p className="my-5 px-5 text-base">{subscription.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 px-5">
                            <button className="w-full py-3 px-6 border border-[#038c6d] rounded-lg" >
                                Delete
                            </button>
                            <button onClick={() => showModal(true, subscription)} className="w-full py-3 px-6 border bg-[#038c6d] text-white rounded-lg">
                                Edit Package
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding/editing subscription */}
            <Modal
                title={isEditing ? 'Edit Subscription' : 'Add Subscription'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Remove default cancel and ok buttons
            >
                <div className="mb-4">
                    <span className="block mb-2 font-semibold">Subscription Package name</span>
                    <Input
                        placeholder="Enter subscription name"
                        value={subscriptionName}
                        onChange={(e) => setSubscriptionName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <span className="block mb-2 font-semibold">Subscription Package Price</span>
                    <Input
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <span className="block mb-2 font-semibold">Subscription Package Details</span>
                    <textarea
                        className='w-full h-40 border border-gray-300 rounded-md p-2'
                        placeholder="Enter subscription description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                </div>

                <button
                    type="primary"
                    className="w-full py-3 bg-[#038c6d] text-white"
                    onClick={handleSubmit}
                >
                    {isEditing ? 'Update Subscription' : 'Add Subscription'}
                </button>
            </Modal>
        </section>
    );
};

export default Subscription;
