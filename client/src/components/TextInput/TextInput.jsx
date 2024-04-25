import React from "react";
import "./textInput.css";
export const TextInput = ({ placeholder, type, name, value, size, onChange, padding, ...rest }) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="container">
        <textarea className="componente-content-input"
          type={type}
          placeholder={placeholder}
          value={value}
          name = {name}
          style={size}
          padding={padding}
          onChange={handleChange}
          {...rest}
        />
    </div>
  );
};
