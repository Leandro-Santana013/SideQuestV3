import React, { useState, useEffect } from "react";
import "./passwordStrength.css"; // Importar o CSS

const PasswordStrength = ({ password }) => {
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });

  const checkRequirements = (pwd) => {
    const length = pwd.length >= 6;
    const uppercase = /[A-Z]/.test(pwd);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const number = /[0-9]/.test(pwd);

    setRequirements({
      length,
      uppercase,
      specialChar,
      number,
    });
  };

  useEffect(() => {
    checkRequirements(password);
  }, [password]);

  return (
    <div className="password-strength-container">
      <h4>Requerimentos de senha</h4>
      <ul className="password-strength">
        <li className={requirements.length ? "valid" : "invalid"}>
          <span className="icon">{requirements.length ? "✔" : "✘"}</span> 
          6 caracteres
        </li>
        <li className={requirements.uppercase ? "valid" : "invalid"}>
          <span className="icon">{requirements.uppercase ? "✔" : "✘"}</span> 
          1 caractere maiúsculo
        </li>
        <li className={requirements.specialChar ? "valid" : "invalid"}>
          <span className="icon">{requirements.specialChar ? "✔" : "✘"}</span> 
          1 caractere especial
        </li>
        <li className={requirements.number ? "valid" : "invalid"}>
          <span className="icon">{requirements.number ? "✔" : "✘"}</span> 
          1 numero
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrength;
