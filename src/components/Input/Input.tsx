import React from "react";
import "../../App.css";

interface PropsInterface {
  divClasses?: string;
  label?: string;
  inputClasses?: string;
  type?: string;
  name?: string;
  value?: any;
  placeholder?: string;
  onChange?: any;
}

const Input = ({
  divClasses,
  inputClasses,
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
}: PropsInterface) => {
  return (
    <div className={`${divClasses}`}>
      <label className="tracking-[2px]">{label}</label>
      <input
        className={`${inputClasses}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
