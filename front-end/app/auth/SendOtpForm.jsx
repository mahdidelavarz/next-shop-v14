import TextField from "@/common/TextField";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

function SendOtpForm({ phoneNumber, onChange, onSubmit, isPending }) {
  return (
    <form
      className="flex flex-col gap-10 justify-center items-center"
      onSubmit={onSubmit}
    >
      <TextField
        label="شماره تلفن"
        name={phoneNumber}
        onChange={onChange}
        value={phoneNumber}
      />
      <button
        className="btn btn--primary w-full h-12 bg-gradient-to-l hover:bg-gradient-to-r from-primary-300 to-primary-500 text-white rounded-md mt-6 flex justify-center items-center "
        type="submit"
      >
        {isPending ? (
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
    </form>
  );
}

export default SendOtpForm;
