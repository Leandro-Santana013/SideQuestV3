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
  const [cepError, setCepError] = useState(false);
  const [urgencia, setUrgencia] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const [formData, setFormData] = useState({
    titulo: null,
    dsServico: null,
    cep: null,
    uf_localidade: null,
    logradouro: null,
    bairro: null,
    nmrResidencia: null,
    inicio: null,
    fim: null,
    valorinicial: null,
    valorfinal: null,
    urgencia: null,
    categoriaSelecionada: null
  });

  const handleNext = () => {
    setForm(form + 1);
  };

  const handleBefore = () => {
    if (form === 1) {
      navigate("/homeCliente");
    } else {
      setForm(form - 1);
    }
  };

  const handleCepChange = (event) => {
    setAddressData({}); // Limpar os dados do endereço ao editar manualmente o CEP
    setCep(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setAddressData(response.data);
        console.log(response.data);

        if (response.data.erro === true) {
          setCepError(true);
        } else {
          setCepError(false);
          // Preencha automaticamente o estado e a cidade (ou use outras informações, se necessário)
          setFormData({
            ...formData,
            cep: cep,
            uf_localidade: `${response.data.uf} - ${response.data.localidade}`,
            bairro: response.data.bairro,
            logradouro: response.data.logradouro,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (cep.length === 8) {
      fetchData();
    }
  }, [cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        titulo,
        dsServico,
        cep,
        uf_localidade,
        localidade,
        logradouro,
        bairro,
        nmrResidencia,
        inicio,
        fim,
        valorinicial,
        valorfinal,
        categoriaSelecionada,
      } = formData;
      const formDataBack = {
        titulo,
        dsServico,
        cep,
        uf_localidade,
        localidade,
        logradouro,
        bairro,
        nmrResidencia,
        inicio,
        fim,
        valorinicial,
        valorfinal,
        categoriaSelecionada,
      };
      const response = await axios.post(
        "http://localhost:5000/auth/postarServico",
        formDataBack
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMessage(
        error.response?.data?.message || "Erro ao cadastrar. Tente novamente."
      );
    }
  };

  const handleUrgenciaChange = (event) => {
    // Atualiza o estado da urgência com base no estado atual do checkbox
    setUrgencia(event.target.checked);
  };

  const handleFormSubmit = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEstadoCidadeChange = (event) => {
    // Permitir que o usuário edite o campo "Estado - Cidade"
    setFormData((prevFormData) => ({
      ...prevFormData,
      uf_localidade: event.target.value,
    }));
  };
  const handlebairro = (event) => {
    // Permitir que o usuário edite o campo "Estado - Cidade"
    setFormData((prevFormData) => ({
      ...prevFormData,
      bairro: event.target.value,
    }));
  };

  const handlelogradouro = (event) => {
    // Permitir que o usuário edite o campo "Estado - Cidade"
    setFormData((prevFormData) => ({
      ...prevFormData,
      logradouro: event.target.value,
    }));
  };

  useEffect(() => {
    // Função para buscar as categorias ao montar o componente
    const carregarCategorias = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/selectCategoria"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    // Chama a função para buscar as categorias
    carregarCategorias();
  }, []);
  const handleCategoriaChange = (event) => {
    setCategoriaSelecionada(event.target.value);
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
          <form onSubmit={handleSubmit} className="postarServico1">
            {form === 1 && (
              <div>
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
                      onChange={handleFormSubmit}
                      placeholder={"Busque por serviços"}
                      value={formData.titulo}
                    />

                    <div className="emergente-categorias">
                      <div className="emergente">
                        <input
                          type="checkbox"
                          id="targetemergencia"
                          checked={urgencia}
                          onChange={handleUrgenciaChange}
                        />
                        Serviço urgente
                        <RiQuestionLine className="emergenteDuvida" />
                      </div>
                      <select id="categoriaSelect" value={categoriaSelecionada} onChange={handleCategoriaChange}className="categorias">
                        {categorias.map((categoria) => (
                          <option
                            key={categoria.cd_categoria}
                            value={categoria.cd_categoria}
                          >
                            {categoria.ds_categoria}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h3 className="tituloServico">
                      Descreva o serviço detalhadamente
                    </h3>
                    <TextInput
                      type="text"
                      name="servico"
                      size={{ width: "35vw", height: "10vw" }}
                      onChange={handleFormSubmit}
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
                    <button className="btnProximo" onClick={handleNext}>
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {form === 2 && (
              <div>
                <div className="headerVoltar">
                  <div className="btnVoltar" onClick={handleBefore}>
                    <RiArrowLeftLine className="iconeVoltar" />
                  </div>
                </div>
                <div className="left-rightPostar">
                  <div className="leftPostar">
                    <h3 className="tituloServico">Endereço</h3>
                    <h4 className="postarH4">CEP</h4>
                    <div>
                      <TextInput
                        type="text"
                        name="cep"
                        size={{
                          width: "6vw",
                          height: "3vw",
                          border: cepError
                            ? "1px solid red"
                            : "1px solid black",
                        }}
                        onChange={handleCepChange}
                        placeholder={""}
                        value={cep}
                      />
                      {cepError && <p className="cepError">CEP incorreto</p>}
                    </div>
                    <h4 className="postarH4">Estado - Cidade</h4>
                    <TextInput
                      type="text"
                      name="estado_cidade"
                      size={{ width: "30vw", height: "3vw" }}
                      onChange={handleEstadoCidadeChange}
                      placeholder={""}
                      value={formData.uf_localidade}
                      disabled
                    />

                    <h4 className="postarH4">Bairro</h4>
                    <TextInput
                      type="text"
                      name="bairro"
                      size={{ width: "30vw", height: "3vw" }}
                      onChange={handlebairro}
                      placeholder={""}
                      value={formData.bairro}
                    />

                    <div className="rua-numero">
                      <div>
                        <h4 className="postarH4">Nome da rua</h4>
                        <TextInput
                          type="text"
                          name="nmRua"
                          size={{ width: "17vw", height: "3vw" }}
                          onChange={handlelogradouro}
                          placeholder={""}
                          value={formData.logradouro}
                        />
                      </div>
                      <div>
                        <h4 className="postarH4">Número da residência</h4>
                        <TextInput
                          type="number"
                          name="nmrResidencia"
                          size={{ width: "8vw", height: "3vw" }}
                          onChange={handleFormSubmit}
                          placeholder={""}
                          value={formData.nmrResidencia}
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
                    <button className="btnProximo" onClick={handleNext}>
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {form === 3 && (
              <div>
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
                          value={formData.inicio}
                        />
                      </div>
                      <div className="fim">
                        <h4 className="postarH4">fim</h4>
                        <TextInput
                          type="date"
                          name="fim"
                          size={{ width: "8vw", height: "3vw" }}
                          placeholder={""}
                          value={formData.fim}
                        />
                      </div>
                    </div>

                    <h3 className="tituloServico">Pretensão de valores</h3>
                    <h4 className="pretensaoH4">
                      O quanto você pretende pagar (Esse valor não é definitivo)
                    </h4>
                    <div className="inicio-fim">
                      <div className="inicio">
                        <h4 className="postarH4">valor inicial</h4>
                        <TextInput
                          type="number"
                          name="pretensaoInicio"
                          size={{ width: "8vw", height: "3vw" }}
                          placeholder={""}
                          value={formData.valorinicial}
                        />
                      </div>
                      <div className="fim">
                        <h4 className="postarH4">fim</h4>
                        <TextInput
                          type="date"
                          name="pretensaoFim"
                          size={{ width: "8vw", height: "3vw" }}
                          placeholder={""}
                          value={formData.valorfinal}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rightPostar">
                    <button type="submit" className="btnProximo">
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default PostarServico;
