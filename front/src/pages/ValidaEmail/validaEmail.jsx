import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './validaEmail.css'

import { MdError } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const validaEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      try {
        // Supondo que você tenha algum estado ou propriedade com os dados a serem enviados
        const dataToSend = {
          token: token, // Inclui o token na requisição
        };

        // Faça uma solicitação para o servidor usando o Axios
        const response = await axios.post('http://localhost:5000/auth/validaemail', dataToSend);

        // Verifique se a resposta foi bem-sucedida (isso pode variar dependendo do seu servidor)
        if (response.status === 200) {
          setMessage(response.data.message);

        } else {
          console.error('Erro ao fazer login:', response.statusText);
        }
      } catch (error) {
        console.error('Erro inesperado ao fazer login:', error);
      }
    };

    // Chame a função ao montar o componente
    sendData();
  }, [token]);

  return (
    <div className='container-mensagem-valida-email'>
      {
        (message == "Acesso não autorizado token invalido" || message == "Erro interno do servidor") && (
          <div className='card-mensagem-valida-email'>
            <MdError className='icone-de-erro'/>
            <h3 className="message">{message}</h3>
            <p>Não foi possível confirmar o seu e-mail</p>
          </div>
        )
      } 

      {
        message == "E-mail confirmado com sucesso!" && (
          <div className='card-mensagem-valida-email'>
              <RiVerifiedBadgeFill  className='icone-de-sucesso'/>
              <h3 className="message">{message}</h3>
              <p>Sucesso! Você já pode fechar essa página e realizar o seu login em nossa plataforma.</p>
          </div>
        )
      }
    </div>
  );
};

export default validaEmail
