import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { FaArrowRight } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";
function CheckOtpForm({
  onSubmit,
  otp,
  setOtp,
  phoneNumber,
  onBack,
  time,
  onSendOtp,
  isChecking,
}) {
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex gap-3 items-center">
          <span
            onClick={onBack}
            className="btn text-xl w-16 h-10 text-primary-500 hover:border hover:border-primary-500 rounded-md flex items-center justify-center cursor-pointer"
          >
            <FaArrowRight />
          </span>
          <p className="my-4 text-xl">کد تایید را وارد نمایید </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-secondary-600 text-sm">
            کد تایید برای شماره موبایل {phoneNumber} ارسال شد.
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> - </span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={{
              display: "flex",
              gap: "0.5rem",
              flexDirection: "row-reverse",
            }}
            inputStyle={{
              width: "2.5rem",
              padding: "0.5rem 0.2rem",
              border: "1px solid rgb(var(--color-primary-300))",
              borderRadius: "0.5rem",
              outlineColor: "rgb(var(--color-primary-300))",
            }}
          />
        </div>
        <button type="submit" className="btn btn--primary w-full">
          {isChecking ? (
            <ThreeDots
              height="60"
              width="60"
              radius="9"
              color="white"
              ariaLabel="loading"
            />
          ) : (
            "تایید"
          )}
        </button>
        {time > 0 ? (
          <p className="text-secondary-600 mt-5 w-full flex justify-center">
            {time} مانده تا دریافت مجدد کد{" "}
          </p>
        ) : (
          <span
            className="btn cursor-pointer flex justify-center border border-primary-300 w-40 py-2 text-primary-700"
            onClick={onSendOtp}
          >
            دریافت مجدد کد
          </span>
        )}
      </form>
    </div>
  );
}

export default CheckOtpForm;
