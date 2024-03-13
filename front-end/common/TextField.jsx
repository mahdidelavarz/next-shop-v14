import React from "react";

function TextField({ label, name, id, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 justify-center items-start">
      <label htmlFor={id} className="text-secondary-500">
        {label}
      </label>
      <input
        className="textField__input"
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextField;
