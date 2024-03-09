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
  const [form, setForm] = useState(1);
  const [cep, setCep] = useState("");
  const [addressData, setAddressData] = useState({});
  const [manualAddress, setManualAddress] = useState({
    estadoCidade: null,
    bairro: null,
    estado_cidade: null,
    nmRua: null,
    nmrResidencia: null,
  });
  const [formData, setFormData] = useState({
    titulo: null,
    dsServico: null,
    cep: null,
  });

  const handleNext = () => {
    setForm(form + 1);
  };

  const handleBefore = () => {
    if (form === 1) {
      navigate("/homecliente");
    } else {
      setForm(form - 1);
    }
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setAddressData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    if (cep.length === 8) {
      fetchData();
    }
  }, [cep]);

  const handleManualAddressChange = (e) => {
    setManualAddress({
      ...manualAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = () => {
    // Adicione aqui a lógica para enviar os dados do formulário
    console.log(formData);
  };

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
                    name="titulo"
                    type="text"
                    size={{ width: "35vw", height: "3vw" }}
                    onChange={handleFormDataChange}
                    placeholder={"Busque por serviços"}
                    value={formData.titulo}
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
                    type="text"
                    name="servico"
                    size={{ width: "35vw", height: "10vw" }}
                    onChange={handleFormDataChange}
                    placeholder={
                      "Exemplo: Eu preciso de um pintor para pintar uma parede externa de 4 metros de altura e 6 metros de largura. A parede é feita de tijolos e precisa ser limpa e preparada antes da pintura. Eu gostaria que a parede fosse pintada com tinta acrílica branca. Já comprei toda a tinta necessária, caso precise de mais tinta posso comprar."
                    }
                    value={formData.dsServico}
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
                    type="number"
                    name="cep"
                    size={{ width: "8vw", height: "3vw" }}
                    onChange={handleCepChange}
                    placeholder={""}
                    value={cep && formData.cep}
                  />

                  <h4 className="postarH4">Estado - Cidade</h4>
                  <TextInput
                    type="text"
                    name="estado_cidade"
                    size={{ width: "30vw", height: "3vw" }}
                    onChange={handleManualAddressChange}
                    placeholder={""}
                    value={manualAddress.estado_cidade ? manualAddress.estado_cidade : manualAddress.estado_cidade || addressData.uf}
                  />

                  <h4 className="postarH4">Bairro</h4>
                  <TextInput
                    type="text"
                    name="bairro"
                    size={{ width: "30vw", height: "3vw" }}
                    onChange={handleManualAddressChange}
                    placeholder={""}
                    value={manualAddress.bairro ? manualAddress.bairro : addressData.bairro}
                  />

                  <div className="rua-numero">
                    <div>
                      <h4 className="postarH4">Nome da rua</h4>
                      <TextInput
                        type="text"
                        name="nmRua"
                        size={{ width: "17vw", height: "3vw" }}
                        onChange={handleManualAddressChange}
                        placeholder={""}
                        value={manualAddress.nmRua ? manualAddress.nmRua : addressData.logradouro ? addressData.logradouro : ""}
                      />
                    </div>
                    <div>
                      <h4 className="postarH4">Número da residência</h4>
                      <TextInput
                        type="number"
                        name="nmrResidencia"
                        size={{ width: "8vw", height: "3vw" }}
                        onChange={handleManualAddressChange}
                        placeholder={""}
                        value={manualAddress.nmrResidencia || ""}
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
                      <TextInput
                        type="date"
                        name="inicio"
                        size={{ width: "8vw", height: "3vw" }}
                        placeholder={""}
                      />
                    </div>
                    <div className="fim">
                      <h4 className="postarH4">fim</h4>
                      <TextInput
                        type="date"
                        name="fim"
                        size={{ width: "8vw", height: "3vw" }}
                        placeholder={""}
                      />
                    </div>
                  </div>

                  <h3 className="tituloServico">Pretensão de valores</h3>
                  <h4 className="pretensaoH4">
                    O quanto você pretende pagar (Esse valor não é definitivo)
                  </h4>
                  <div className="inicio-fim">
                    <div className="inicio">
                      <h4 className="postarH4">Inicio</h4>
                      <TextInput
                        type="date"
                        name="pretensaoInicio"
                        size={{ width: "8vw", height: "3vw" }}
                        placeholder={""}
                      />
                    </div>
                    <div className="fim">
                      <h4 className="postarH4">fim</h4>
                      <TextInput
                        type="date"
                        name="pretensaoFim"
                        size={{ width: "8vw", height: "3vw" }}
                        placeholder={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="rightPostar">
                  <div className="btnProximo" onClick={handleFormSubmit}>
                    Publicar
                  </div>
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
