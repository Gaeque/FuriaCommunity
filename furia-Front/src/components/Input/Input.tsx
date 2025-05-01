import React from "react";
import "./Input.styles.css";

interface SizeProps {
  width?: string;
  height?: string;
}

interface InputProps {
  label?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: SizeProps;
  backgroundColor?: string;
  color?: string;
}

export function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
  size,
  backgroundColor,
  color,
}: InputProps) {
  return (
    <div className="input-container">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
      <input
        id={label}
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: size?.width,
          height: size?.height,
          backgroundColor: backgroundColor,
          color: color,
        }}
      />
    </div>
  );
}
