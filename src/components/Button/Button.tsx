import React from "react";
import "../../index.css";

interface PropsInterface {
  title?: string;
  divClasses?: string;
  buttonClasses?: string;
}

const Button = ({ title, divClasses, buttonClasses }: PropsInterface) => {
  return (
    <div className={`w-full h-full ${divClasses}`}>
      <button className={`${buttonClasses}`}>{title}</button>
    </div>
  );
};

export default Button;
