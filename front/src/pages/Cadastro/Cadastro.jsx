import React, { useState } from 'react';
import img_cad from '../../assets/cad-img.png';
import img_logo from '../../assets/sidequest_3.png';
import axios from 'axios';

import './cadastro.css'

export const Cadastro = () => {
  const [isProfessional, setIsProfessional] = useState();

  const [formData, setFormData] = useState({
    name: null,
    email: null,
    cpf: null,
    senha: null,
    senhaConfirm: null,
  });

  const [formDatapro, setFormDatapro] = useState({
    name: null,
    email: null,
    cpf: null,
    senha: null,
    senhaConfirm: null,
  });

  const toggleForm = () => {
    setIsProfessional((prevIsProfessional) => !prevIsProfessional);
  };
  const [message, setMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/auth/register', formData);

      setMessage(response.data.message);

    } catch (error) { 
      console.error('Erro ao cadastrar:', error);
      setMessage(error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
    }

  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/auth/registerPro', formDatapro);

      setMessage(response.data.message);


    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMessage(error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
    }


  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormDatapro({
      ...formDatapro,
      [e.target.name]: e.target.value,
    });
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return (
    <div className='cadBody'>
      <div className='divMessage'>
        {message && <div className="message">
          <div className='closeMessage' onClick={closeMessage}>x</div>
          <div className='msgErroCad'>{message}</div>
        </div>}
      </div>
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
              <form onSubmit={handleSubmit} className={isProfessional ? 'formCliente' : 'formProfi'}>
                <input placeholder="Digite seu nome" type="name" name="name" value={formData.name} onChange={handleChange} />
                <input placeholder="Digite seu email" type="email" name="email" value={formData.email} onChange={handleChange} />
                <input placeholder="Digite seu CPF" type="text" id="cpfInput" name="cpf" value={formData.cpf} onChange={handleChange} />
                <input placeholder="Digite uma senha" type="password" name="senha" value={formData.senha} onChange={handleChange} />
                <input placeholder="Confirme sua senha" type="password" name="senhaConfirm" value={formData.senhaConfirm} onChange={handleChange} />
                <button type="submit" class="btn-criar">Criar</button>
              </form>
              <form onSubmit={handleSubmit1} className={isProfessional ? 'formProfi' : 'formCliente'}>
                <input placeholder="Digite s" type="name" name="name" value={formDatapro.name} onChange={handleChange} />
                <input placeholder="Digite seu email" type="email" name="email" value={formDatapro.email} onChange={handleChange} />
                <input placeholder="Digite seu CPF" type="text" id="cpfInput" name="cpf" value={formDatapro.cpf} onChange={handleChange} />
                <input placeholder="Digite uma senha" type="password" name="senha" value={formDatapro.senha} onChange={handleChange} />
                <input placeholder="Confirme sua senha" type="password" name="senhaConfirm" value={formDatapro.senhaConfirm} onChange={handleChange} />
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
    </div>
  );
};

