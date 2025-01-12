import { Button, Form, Input, Upload } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import defaultUserImage from "/public/Auth/user.png";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PersonalinfoEdit = () => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const [phoneNumber, setPhoneNumber] = useState('+880123456789'); // Static phone number for example
    const [form] = Form.useForm(); // Initialize form reference

    useEffect(() => {
        // Set default form data (since we're using raw text, no need to fetch dynamic data)
        form.setFieldsValue({
            name: "Absayed", // Static name
            email: "admin@example.com", // Static email
        });
        setImageUrl(defaultUserImage); // Static image for default profile picture
    }, [form]);

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList[0]?.originFileObj) {
            const reader = new FileReader();
            reader.readAsDataURL(newFileList[0].originFileObj);
            reader.onload = () => setImageUrl(reader.result);
        }
    };

    const handleUpdateProfile = async (values) => {
        // Here, formData will be generated for submission, but we are working with static data
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("phoneNumber", phoneNumber);
        if (fileList[0]?.originFileObj) {
            formData.append("profile", fileList[0].originFileObj);
        }

        try {
            // Simulate an API call
            setTimeout(() => {
                console.log("Profile updated successfully!");
                navigate("/settings/personal-info");
            }, 1000);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="font-[Aldrich]">
            <div
                onClick={() => navigate("/settings/personal-info")}
                className="flex items-center cursor-pointer ml-6 my-8"
            >
                <MdOutlineKeyboardArrowLeft size={30} />
                <h1 className="text-xl font-medium ml-2">Edit Profile</h1>
            </div>

            <div className="sm:mx-6  rounded-xl bg-white">
                <Form
                    form={form} // Attach form reference
                    layout="vertical"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={handleUpdateProfile}
                >
                    <div className="flex flex-col lg:flex-row gap-10 ">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center w-full lg:w-1/3 border-dotted border">
                            <div className="relative sm:w-56 w-48 sm:h-56 h-48 rounded-full flex justify-center items-center mt-5 bg-gray-50 border">
                                <Upload
                                    name="profile"
                                    showUploadList={false}
                                    onChange={handleUploadChange}
                                >
                                    <img
                                        className="w-44 h-44 rounded-full"
                                        src={imageUrl || defaultUserImage}
                                        alt="Profile"
                                    />
                                    <Button
                                        className="border-none text-md text-blue-500 absolute bottom-6 flex items-center"
                                        icon={<LuImagePlus size={20} className="mr-2" />}
                                    >
                                        Change Picture
                                    </Button>
                                </Upload>
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-lg">admin</p>
                                <h1 className="text-2xl font-medium">absayed</h1>
                            </div>
                        </div>

                        {/* Form Inputs Section */}
                        <div className="flex-1 w-full lg:w-2/3">
                            <div className="flex flex-col gap-6">
                                <Form.Item
                                    label={<span className="text-lg font-medium">Name</span>}
                                    name="name"
                                >
                                    <Input
                                        placeholder="Name"
                                        className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue="Absayed" // Static name
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-lg font-medium">Email</span>}
                                    name="email"
                                >
                                    <Input
                                        placeholder="Email"
                                        className="p-4 rounded-lg border-gray-300 "
                                        readOnly
                                        defaultValue="admin@example.com" // Static email
                                    />
                                </Form.Item>

                                <div className="flex flex-col">
                                    <label className="text-lg font-medium mb-2">Phone Number</label>

                                    {/* PhoneInput Component */}
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={phoneNumber}  // The state holding the phone number
                                        onChange={setPhoneNumber}  // Updating state on change
                                        international  // To display international numbers with country flags
                                        defaultCountry="bd"  // Default country, you can change it to any country code
                                        className="rounded-lg border-gray-300 py-3 focus:ring-blue-500 focus:border-blue-500 border-2 px-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    <div className="flex sm:justify-end justify-center items-center mt-8">
                        <Button
                            htmlType="submit"
                            className="h-14 md:px-20 !bg-[#038c6d] !text-white rounded-lg text-lg font-medium"
                        >
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PersonalinfoEdit;
