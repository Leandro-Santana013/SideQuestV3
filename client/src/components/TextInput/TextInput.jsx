import React from "react";
import "./textInput.css";
export const TextInput = ({ placeholder, type, name, value, size, onChange, ...rest }) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="container">
        <input className="content-input"
          type={type}
          placeholder={placeholder}
          value={value}
          name = {name}
          style={size}
          onChange={handleChange}
          {...rest}
        />
    </div>
  );
};
