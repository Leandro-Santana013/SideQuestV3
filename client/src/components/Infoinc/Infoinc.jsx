  import React, { useState, useEffect, useContext } from "react";
  import axios from "axios";
  import Cookies from "js-cookie";
  import { IoMdClose } from "react-icons/io";
  import "./infoInc.css";
  import { UserContext } from "../../context/UserContext";

  export const Infoinc = () => {
    const {  modal, setModal, setInfoConfirm, concluirCad, fetchDataConcluir, cepError, ConclussioncadError } = useContext(UserContext);


    const handleCepChange = (e) => {
      const cep = e.target.value;
      const cepToFetch = cep; // Armazena o valor atual do CEP em uma variável local
      if (cep.length === 8)
        fetchDataConcluir(cepToFetch); // Chama a função de busca de dados do CEP com o valor atual
    };

  
    const handleChange = (field, event) => {
      const novoValor = event.target.value;
      setInfoConfirm((prevFormData) => ({
        ...prevFormData,
        [field]: novoValor,
      }));
    };

    const setModalConcluaRegistro = (param) => {
      if (param == 1) setModal(modal + 1);
      else if (param == 2) setModal(modal - 1);
      else if (param == 0) setModal(0);
    };

    return (
      <>
        {modal != 0 && (
          <div className="modal-card-conclua-registro">
            {modal == 1 && (
              <div className="card-conclua-registro">
                <div className="top-card-conclua-registro">
                  <h1>Conclua o seu registro</h1>
                  <p>
                    Finalize o seu cadastro para uma melhor experiência em nossa
                    plataforma
                  </p>
                  {ConclussioncadError && (
                    <span style={{ color: 'red'}}>{ConclussioncadError}</span>
                  )}
                    
                </div>
                <div className="inputs-card-conclua-registro">
                  <p>Telefone ou celular</p>
                  <input
                    className="nmr-telefone"
                    type="tel"
                    accept="number"
                    placeholder="Ex: 13991165590"
                    onChange={(event) => handleChange("telefone", event)}
                  />
                  <p>Data de nascimento</p>
                  <input
                    className="data"
                    type="date"
                    onChange={(event) => handleChange("data", event)}
                  />
                  <p>Sexo</p>
                  <select
                    name=""
                    id=""
                    aria-placeholder=""
                    onChange={(event) => handleChange("sexo", event)}
                  >
                    <option value="-">Prefiro não dizer</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
                <div className="bottom-card-conclua-registro">
                  <p onClick={() => setModalConcluaRegistro(0)}>
                    Deixar para depois
                  </p>
                  <button onClick={() => setModalConcluaRegistro(1)}>
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {modal == 2 && (
              <div className="card-conclua-registro">
                <div className="top-card-conclua-registro">
                  <h1>Conclua o seu registro</h1>
                  <p>
                    Insira o seu endereço (você poderá adicionar outros
                    posteriormente).
                  </p>
                  {ConclussioncadError && (
                    <span style={{ color: 'red'}}>{ConclussioncadError}</span>
                  )}
                </div>
                <div className="inputs-card-conclua-registro">
                  <div className="grid-2x2-card-conclua-registro">
                    <div className="inputs-card-conclua-registro-cep">
                    {cepError && (
                      <p className="cepError-conluircad">CEP incorreto</p>
                    )}
                    <input
                      className="padrao-input-card-conclua-registro"
                      type="number"
                      placeholder="Cep"
                      style={{
                        border: cepError && "2px solid red"
                      }}
                      onChange={(event) => {
                        handleChange("cep", event);
                        handleCepChange(event);
                      }}
                    />
                    
                    </div>
                    <input
                      className="padrao-input-card-conclua-registro"
                      type="number"
                      placeholder="Nº"
                      onChange={(event) => handleChange("numeroResidencia", event)}
                    />
                    <input
                      className="padrao-input-card-conclua-registro"
                      type="text"
                      placeholder="Complemento"
                      onChange={(event) => handleChange("complemento", event)}
                    />
                  </div>
                </div>
                <div className="bottom-card-conclua-registro">
                  <p onClick={() => {setModalConcluaRegistro(2)}}>Voltar</p>
                  <button onClick={() => {concluirCad()}}>Finalizar</button>
                </div>
              </div>
            )}
            {modal == 3 && (<></>)}
          </div>
        )}
      </>
    );
  };
