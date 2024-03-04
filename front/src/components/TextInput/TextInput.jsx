import React from "react";
import "./textInput.css";
export const TextInput = ({ placeholder, value, size, onChange, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="container">
        <input className="content-input"
          type="text"
          placeholder={placeholder}
          value={value}
          style={size}
          onChange={handleChange}
          {...rest}
        />
    </div>
  );
};
