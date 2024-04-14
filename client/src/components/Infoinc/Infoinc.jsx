import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import './infoInc.css';
export const Infoinc = () => {
  const [infoDados, setinfoDados] = useState();
  const [openModalPerfil, setOpenModalPerfil] = useState(false);
  const [message, setMessage] = useState(null);
 

  console.log(infoDados)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <>
      {infoDados && (
        <div className="modalInfoCLi">
          <IoMdClose
            className="close-editar-perfil"
            onClick={() => setOpenModalPerfil(false)}
          />  
           <h2>Conclua seu registro.</h2>
            <h5>personalize sua conta para uma melhor experiência</h5>
          <form>
            <div className="social-container"></div>
            {message && <div className="container-mensagem-erro">{message}</div>}
            <input placeholder="Digite seu email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <input placeholder="Digite uma senha" type="date" name="senha" value={formData.senha} onChange={handleChange} />
           
            <select
                        id="categoriaSelect"
                        className="select-sexo"
                      >
                      <option value="" disabled selected>Gênero</option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                        <option>Prefiro não dizer</option>

                      </select>
            <a className="forgot" href="#">Esqueceu a sua senha?</a>
            <button type='submit'>Entrar</button>
          </form>
        </div>
      )}
    </>
  )
}