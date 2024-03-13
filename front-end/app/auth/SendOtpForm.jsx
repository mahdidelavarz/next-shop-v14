import TextField from "@/common/TextField";
import React from "react";

function SendOtpForm({ phoneNumber, onChange, onSubmit }) {
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
        className="btn btn--primary w-full bg-gradient-to-l hover:bg-gradient-to-r from-primary-300 to-primary-500 text-white rounded-md mt-6 "
        type="submit"
      >
        تایید
      </button>
    </form>
  );
}

export default SendOtpForm;
