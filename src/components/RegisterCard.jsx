import axios from "axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const RegisterCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:8000/api/register", {
      email: localStorage.getItem("email"),
      ...formData,
    });
    console.log("Response:", res.data);
    const { success, message } = res.data;
    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#DDE5F4]">
      <div className="flex flex-col bg-[#F1F7FE] w-[350px] min-h-[400px] p-8 gap-8 rounded-2xl shadow-md">
        <h1 className="text-center text-2xl font-semibold">Register Form</h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col bg-[#FFFFFF] px-4 py-3 rounded-2xl">
            <p className=" text-gray-500">Name</p>
            <input
              placeholder="Enter your name..."
              className="outline-none border-none text-sm text-black"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col bg-[#FFFFFF] px-4 py-3 rounded-2xl">
            <p className=" text-gray-500">Email Address</p>
            <input
              placeholder="Enter your email address..."
              className="outline-none border-none text-sm text-black"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col bg-[#FFFFFF] px-4 py-3 rounded-2xl">
            <p className=" text-gray-500">Password</p>
            <div className="flex flex-row justify-between">
              <input
                placeholder="Enter your password..."
                className="outline-none border-none text-sm text-black"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <p onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </p>
            </div>
          </div>
          <p
            onClick={handleSubmit}
            className="text-center bg-[#3E4684] p-2 rounded-2xl text-white font-semibold cursor-pointer"
          >
            Register
          </p>
        </div>
        <div className="flex justify-between pb-3 text-sm text-gray-500">
          <p>
            Already an user?{" "}
            <Link className="cursor-pointer hover:text-[#3E4684]" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
