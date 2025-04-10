import React from "react";
import "./input.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  return <input className="input" {...props} />;
};

export default Input;
