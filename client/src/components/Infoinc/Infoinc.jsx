import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import './infoInc.css';
export const Infoinc = () => {
  const [infoDados, setinfoDados] = useState();

  const [formData, setFormData] = useState({
    idCliente: null,
    email: null,
    senha: null,
  });
  const [openModalPerfil, setOpenModalPerfil] = useState(false);
  const [message, setMessage] = useState(null);
  console.log(formData)
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/buscarattcls", formData
      );
      if (response.status === 202) {
        setinfoDados(true);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
    getCookieData();
  }, []);


  const getCookieData = () => {
    const userDataString = decodeURIComponent(Cookies.get("user"));
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Atualize o estado formData com os dados do cookie
      setFormData((prevFormData) => ({
        ...prevFormData,
        idCliente: userData.id_cliente,
        email: userData.email,
      }));
      console.log(userData.id_cliente);
      console.log(userData.email);
    }
  };

  console.log(infoDados)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/completeLogin', formData);
      if (response.status === 200) {
        setMessage(<p className='fail'>{response.data.message}</p>);
      } else if (response.status === 201) {
        console.log("Cookie recebido:", response.data); // Verifique o conteúdo do cookie
        Cookies.set('user', JSON.stringify(response.data));
        navigate('/homeCliente');
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

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
          <form onSubmit={handleSubmit}>
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