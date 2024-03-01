import React from "react";
import "./TextInputStyle.css";

export const TextInput = ({ placeholder, value, onChange, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="container">
      <div className="content-input">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...rest}
        />
        <button className="btn">Encontrar</button>
      </div>
    </div>
  );
};
