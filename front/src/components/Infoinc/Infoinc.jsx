import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const Infoinc = () => {
  const [infoDados, setinfoDados] = useState();

    const [formData, setFormData] = useState({
        idCliente: null,
        email: null,
      });

   console.log(formData)
    const fetchDataFromBackend = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/buscarattcls", formData
          );
          if(response.status ===  202){
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
  return (
    <>
      {infoDados && (
        <div>
          <h1>modalAqui</h1>
        </div>
      )}
    </>
  )
}