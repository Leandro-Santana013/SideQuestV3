import React from "react";
import "./TextInputStyle.css";
import { RiSearch2Line } from "react-icons/ri";
export const TextInput = ({ placeholder, value, onChange, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="container">
      <div className="content-input">
      <RiSearch2Line className="iconSearch" />
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
