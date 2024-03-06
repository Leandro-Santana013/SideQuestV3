import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarCliente, Header, TextInput } from "../../components";
import axios from "axios";

import "./postarServico.css";
import {
  RiArrowLeftLine,
  RiListUnordered,
  RiQuestionLine,
  RiAttachment2,
} from "react-icons/ri";

const PostarServico = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [form, setform] = useState(1);
  const [cep, setCep] = useState(""); // State variable for CEP input
  const [addressData, setAddressData] = useState({}); // State variable to store address data

  const handleChange = (event) => {
    setCep(event.target.value);
  };
  const handleBairroChange = (event) => {
    // Lógica para lidar com as mudanças no campo Bairro
  };
  const handleNext = () => {
    setform(form + 1);
  };
  const handleBefore = () => {
    if (form === 1) {
      // If form is 1, go back to homeCliente
      navigate("/homecliente");
    } else {
      // If form is greater than 1, decrement the form value
      setform(form - 1);
      console.log(form);
    }
  };
  const handleChangecpf = (event) => {
    setCep(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // Replace with your desired CEP API URL
      setAddressData(response.data);
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      handleSearch();
    }
  }, [cep]);

  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="publicarHeader">
            <h2 className="publicarTitulo">Publique um serviço</h2>
            <div className="publicarPassos">
              <div className={`publicar123 ${form === 1 ? "form" : ""}`}>1</div>
              <div className={`publicar123 ${form === 2 ? "form" : ""}`}>2</div>
              <div className={`publicar123 ${form === 3 ? "form" : ""}`}>3</div>
            </div>
          </div>
          {form === 1 && (
            <form className="postarServico1">
              <div className="headerVoltar">
                <div className="btnVoltar" onClick={handleBefore}>
                  <RiArrowLeftLine className="iconeVoltar" />
                </div>
              </div>
              <div className="left-rightPostar">
                <div className="leftPostar">
                  <h3 className="tituloServico">Titulo do serviço</h3>
                  <TextInput
                    size={{ width: "35vw", height: "3vw" }}
                    onChange={handleChange}
                    placeholder={"Busque por serviços"}
                  />

                  <div className="emergente-categorias">
                    <div className="emergente">
                      <input type="checkBox" />
                      Serviço emergente
                      <RiQuestionLine className="emergenteDuvida" />
                    </div>
                    <div className="categorias">
                      Categorias
                      <RiListUnordered />
                    </div>
                  </div>
                  <h3 className="tituloServico">
                    Descreva o serviço detalhadamente
                  </h3>
                  <TextInput
                    size={{ width: "35vw", height: "10vw" }}
                    onChange={handleChange}
                    placeholder={
                      "Exemplo: Eu preciso de um pintor para pintar uma parede externa de 4 metros de altura e 6 metros de largura. A parede é feita de tijolos e precisa ser limpa e preparada antes da pintura. Eu gostaria que a parede fosse pintada com tinta acrílica branca. Já comprei toda a tinta necessária, caso precise de mais tinta posso comprar."
                    }
                  />
                  <div className="anexo">
                    Anexo
                    <RiAttachment2 className="iconAnexo" />
                  </div>
                </div>
                <div className="rightPostar">
                  <div className="btnProximo" onClick={handleNext}>
                    Próximo
                  </div>
                </div>
              </div>
            </form>
          )}

          {form === 2 && (
            <form className="postarServico1">
              <div className="headerVoltar">
                <div className="btnVoltar" onClick={handleBefore}>
                  <RiArrowLeftLine className="iconeVoltar" />
                </div>
              </div>
              <div className="left-rightPostar">
                <div className="leftPostar">
                  <h3 className="tituloServico">Endereço</h3>
                  <h4 className="postarH4">CEP</h4>
                  <TextInput
                    size={{ width: "8vw", height: "3vw" }}
                    onChange={handleChangecpf}
                    placeholder={""}
                    value={cep}
                  />

                  <h4 className="postarH4">Estado - Cidade</h4>
                  <TextInput
                    size={{ width: "30vw", height: "3vw" }}
                 onChange={handleBairroChange}
                    placeholder={""}
                    value={addressData.uf ? `${addressData.uf} - ${addressData.localidade}`: "" }
                  />

                  <h4 className="postarH4">Bairro</h4>
                  <TextInput
                    size={{ width: "30vw", height: "3vw" }}
                    onChange={handleChange}
                    placeholder={""}
                    value={addressData.bairro ? `${addressData.bairro}`: "" }
                  />

                  <div className="rua-numero">
                    <div>
                      <h4 className="postarH4">Nome da rua</h4>
                      <TextInput
                        size={{ width: "17vw", height: "3vw" }}
                        onChange={handleChange}
                        placeholder={""}
                        value={addressData.logradouro ? `${addressData.logradouro}`: ""}
                      />
                    </div>
                    <div>
                      <h4 className="postarH4">Número</h4>
                      <TextInput
                        size={{ width: "8vw", height: "3vw" }}
                        onChange={handleChange}
                        placeholder={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="rightPostar" id="rightPostar2">
                  <h4 className="postarH4">
                    Leve o indicador até sua residência
                  </h4>
                  <div className="mapa"></div>
                  <div className="zoom">
                    <div className="mais-menos">+</div>
                    <div className="mais-menos">-</div>
                  </div>
                  <div className="btnProximo" onClick={handleNext}>
                    Próximo
                  </div>
                </div>
              </div>
            </form>
          )}

          {form === 3 && (
            <form className="postarServico1">
              <div className="headerVoltar">
                <div className="btnVoltar" onClick={handleBefore}>
                  <RiArrowLeftLine className="iconeVoltar" />
                </div>
              </div>
              <div className="left-rightPostar">
                <div className="leftPostar">
                  <h3 className="tituloServico">Previsão de data</h3>
                  <div className="inicio-fim">
                    <div className="inicio">
                      <h4 className="postarH4">Inicio</h4>
                      <div className="anexo"></div>
                    </div>
                    <div className="fim">
                      <h4 className="postarH4">fim</h4>
                      <div className="anexo"></div>
                    </div>
                  </div>

                  <h3 className="tituloServico">Pretensão de valores</h3>
                  <h4 className="pretensaoH4">
                    O quanto você pretende pagar (Esse valor não é definitivo)
                  </h4>
                  <div className="inicio-fim">
                    <div className="inicio">
                      <h4 className="postarH4">Inicio</h4>
                      <div className="anexo"></div>
                    </div>
                    <div className="fim">
                      <h4 className="postarH4">fim</h4>
                      <div className="anexo"></div>
                    </div>
                  </div>
                </div>
                <div className="rightPostar">
                  <div className="btnProximo">Publicar</div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PostarServico;
