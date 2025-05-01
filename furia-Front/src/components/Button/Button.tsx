import React from "react";
import "./Button.styles.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  size?: { width: string; height: string };
  border?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  size = { width: "120px", height: "40px" },
  border = "1px solid #fff",
}) => {
  // 
  const buttonStyle = {
    width: size.width,
    height: size.height,
    border: border,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button;
