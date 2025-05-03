import React from "react";
import "./Button.styles.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  border?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  border = "1px solid #fff",
  style = {},
}) => {
  const combinedStyle: React.CSSProperties = {
    border,
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      style={combinedStyle}
    >
      {children}
    </button>
  );
};

export default Button;
