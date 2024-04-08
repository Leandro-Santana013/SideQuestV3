import React from "react";
import "./TextInputBuscaStyle.css";
import { RiSearch2Line } from "react-icons/ri";
export const TextInputBusca = ({ placeholder, value, onChange, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="container">
      <div className="content-input-busca">
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
