import React from "react";

function TextField({
  label,
  name,
  id,
  value,
  onChange,
  errors,
  required,
  register,
}) {
  return (
    <div className="flex flex-col gap-2 justify-center items-start w-full">
      <label htmlFor={id} className="text-secondary-500">
        {label}
      </label>
      <input
        {...register}
        className="textField__input"
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      {errors && errors[name] && (
        <span className="text-rose-500 block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default TextField;
