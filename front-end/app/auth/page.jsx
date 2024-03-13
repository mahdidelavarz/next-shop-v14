"use client";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import SendOtpForm from "./SendOtpForm";
import { useState } from "react";
import http from "@/services/httpService";
import { toast } from "react-hot-toast";
const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await http.post("user/get-otp", { phoneNumber });
      toast.success("")
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-primary-200 flex justify-center items-center">
      <div className="w-[25rem] h-[35rem] md:w-[30rem] md:h-[40rem]  bg-white rounded-2xl flex flex-col items-center justify-between py-8">
        <h1 className="text-2xl text-primary-500">ثبت نام / ورود</h1>
        <SendOtpForm
          phoneNumber={phoneNumber}
          onChange={handlePhoneNumber}
          onSubmit={handleSendOtp}
        />
        <div className="w-full flex flex-col justify-center items-center">
          <span className="mt-8 mb-6 text-secondary-400 ">Or SignUp Using</span>
          <div className="flex gap-4">
            <span className="w-12 h-12 rounded-full bg-primary-200 text-white flex justify-center items-center cursor-pointer">
              <FaTwitter className="text-2xl text-primary-500" />
            </span>
            <span className="w-12 h-12 rounded-full bg-primary-200 text-white flex justify-center items-center cursor-pointer">
              <FaGoogle className="text-2xl text-primary-500" />
            </span>
            <span className="w-12 h-12 rounded-full bg-primary-200 text-white flex justify-center items-center cursor-pointer">
              <FaFacebookSquare className="text-2xl text-primary-500" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
