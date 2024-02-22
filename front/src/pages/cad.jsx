import React, { useState } from 'react';
import img_cad from '../assets/cad-img.png';
import img_logo from '../assets/sidequest_3.png';

const Cad = () => {
  const [isProfessional, setIsProfessional] = useState(false);

  const toggleForm = () => {
    setIsProfessional((prevIsProfessional) => !prevIsProfessional);
  };

  return (
    <div className="formlogin" class="tbodycad">
      <div className="forms">
        <div className="l-side">
          <img src={img_cad} alt="cad-img" />
        </div>
        <div className="r-side">
          <div className="content-logo">
            <img src={img_logo} alt="sidequest-logo" />
          </div>
          <div className="campos">
            <h2>Crie sua conta!</h2>
            <label className="btn-slide">
              <input
                type="checkbox"
                id="toggleButton"
                onChange={toggleForm}
                checked={isProfessional}
              />
              <span className="slider"></span>
            </label>
            <form action="/auth/register" method="post" className={isProfessional ? 'formCliente' : 'formProfi'}>
            <input placeholder="Digite seu nome" type="name" name="name" />
                    <input placeholder="Digite seu email" type="email" name="email" />
                    <input placeholder="Digite seu CPF" type="text" id="cpfInput" name="cpf" />
                    <input placeholder="Digite uma senha" type="password" name="senha" />
                    <input placeholder="Confirme sua senha" type="password" name="senhaConfirm" />
                    <button type="submit" class="btn-criar">Criar</button>
            </form>
            <form action="/auth/registerPro" method="post" className={isProfessional ? 'formProfi' : 'formCliente'}>
            <input placeholder="sexo" type="name" name="name" />
                    <input placeholder="Digite seu email" type="email" name="email" />
                    <input placeholder="Digite seu CPF" type="text" id="cpfInput" name="cpf" />
                    <input placeholder="Digite uma senha" type="password" name="senha" />
                    <input placeholder="Confirme sua senha" type="password" name="senhaConfirm" />
                    <button type="submit" class="btn-criar">Criar</button>
            </form>
            <div className="entre-google">
              <div className="linha"></div>
              <p>ou entre com o google</p>
              <div className="linha"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cad;