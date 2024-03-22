"use client";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import SendOtpForm from "./SendOtpForm";
import { useEffect, useState } from "react";
import http from "@/services/httpService";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import CheckOtpForm from "./CheckOtpForm";
import { useRouter } from "next/navigation";
const AuthPage = () => {
  // !-----------------------------------------------states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(2);
  const [time, setTime] = useState(90);
  const router = useRouter();
  // !-----------------------------------------------mutations
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });
  const { mutateAsync: mutateCheckOtp } = useMutation({
    mutationFn: checkOtp,
  });
  // !-----------------------------------------------handlers
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(phoneNumber);
      toast.success(data.message);
      setStep(2);
      setTime(90);
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleCheckOtp = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((s) => s - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOtpForm
            phoneNumber={phoneNumber}
            onChange={handlePhoneNumber}
            onSubmit={handleSendOtp}
            isPending={isPending}
          />
        );
      case 2:
        return (
          <CheckOtpForm
            onSubmit={handleCheckOtp}
            otp={otp}
            setOtp={setOtp}
            phoneNumber={phoneNumber}
            onBack={() => setStep(1)}
            time={time}
            onSendOtp={handleSendOtp}
          />
        );

      default:
        return null;
    }
  };
  return (
    <div className="w-full h-[100vh] bg-primary-200 flex justify-center items-center">
      <div className="w-[25rem] h-[39rem] md:w-[35rem] md:h-[40rem]  bg-white rounded-2xl flex flex-col items-center justify-between py-8">
        <h1 className="text-2xl text-primary-500">ثبت نام / ورود</h1>
        {renderSteps()}
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
