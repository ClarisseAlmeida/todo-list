import React from "react";
import "./checkbox.css";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
