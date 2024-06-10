import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import "./infoInc.css";
import { UserContext } from "../../context/UserContext";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import InputMask from "react-input-mask";

export const Infoinc = () => {
  const {
    modal,
    setModal,
    setInfoConfirm,
    concluirCad,
    fetchDataConcluir,
    cepError,
    ConclussioncadError
  } = useContext(UserContext);

  const [telefone, setTelefone] = useState("");

  const handleCepChange = (e) => {
    const cep = e.target.value;
    const cepToFetch = cep;
    if (cep.length === 8) fetchDataConcluir(cepToFetch);
  };

  const handleChange = (field, event) => {
    const novoValor = event.target.value;
    setInfoConfirm((prevFormData) => ({
      ...prevFormData,
      [field]: novoValor
    }));
  };

  const handleTelefoneChange = (event) => {
    const telefoneFormatado = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    setTelefone(telefoneFormatado);
    handleChange("telefone", { target: { value: telefoneFormatado } }); // Atualiza o estado com o valor formatado
  };

  const setModalConcluaRegistro = (param) => {
    if (param === 1) {
      if (telefone.length < 11) { // Verifica se o telefone tem 11 dígitos
        alert("Por favor, preencha o telefone corretamente.");
        return;
      }
      setModal(modal + 1);
    } else if (param === 2) {
      setModal(modal - 1);
    } else if (param === 0) {
      setModal(0);
    }
  };

  return (
    <>
      {modal !== 0 && (
        <div className="modal-card-conclua-registro">
          {modal === 1 && (
            <div className="card-conclua-registro">
              <div className="top-card-conclua-registro">
                <h1>Conclua o seu registro</h1>
                <p>
                  Finalize o seu cadastro para uma melhor experiência em nossa
                  plataforma
                </p>
                {ConclussioncadError && (
                  <span style={{ color: "red" }}>{ConclussioncadError}</span>
                )}
              </div>
              <div className="inputs-card-conclua-registro">
                <p>Telefone ou celular</p>
                <InputMask
                  className="nmr-telefone"
                  mask="(99) 99999-9999"
                  placeholder="Ex: (13) 99116-5590"
                  value={telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")} // Aplica a máscara no valor armazenado
                  onChange={handleTelefoneChange}
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
              <div className="bottom-card-conclua-registro" style={{justifyContent: 'center'}}>
                <button onClick={() => setModalConcluaRegistro(1)}>
                  Próximo
                </button>
              </div>
            </div>
          )}

          {modal === 2 && (
            <div className="card-conclua-registro">
              <div className="top-card-conclua-registro">
                <h1>Conclua o seu registro</h1>
                <p>
                  Insira o seu endereço (você poderá adicionar outros
                  posteriormente).
                </p>
                {ConclussioncadError && (
                  <span style={{ color: "red" }}>{ConclussioncadError}</span>
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
                <p onClick={() => setModalConcluaRegistro(2)}>Voltar</p>
                <button onClick={() => concluirCad()}>Finalizar</button>
              </div>
            </div>
          )}
          {modal === 3 && (
            <>
              <div className="card-conclua-registro">
                <RiVerifiedBadgeFill
                  style={{ color: "var(--verde)", fontSize: "5vw" }}
                />
                <h1>Cadastro completo!</h1>
                <p
                  style={{ color: "gray", textAlign: "center" }}
                >
                  O seu cadatro está completo.
                </p>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center !important"
                  }}
                  onClick={() => {
                    setModal(0);
                    window.location.reload();
                  }}
                >
                  Fechar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};