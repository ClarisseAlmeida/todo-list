import React from 'react';
import "./button.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'submit' | 'filter' | 'icon';
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'submit',
  active,
  ...props
}) => {
  const variantClasses: Record<string, string> = {
    submit: 'button--submit',
    filter: 'button--filter',
    icon: 'button--icon',
  };

  const buttonClass = variantClasses[variant] || '';

  return (
    <button className={`${buttonClass} ${active ? "button--active" : ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
