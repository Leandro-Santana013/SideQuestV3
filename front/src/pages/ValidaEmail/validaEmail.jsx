
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';

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
          const response = await axios.post('http://localhost:5002/auth/validaemail', dataToSend);

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
      <div>
      {message && <h3 className="message">{message}</h3>} 
      <button><a></a></button>
      </div>
    );
  };

  export default validaEmail
