import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import './infoInc.css';
import { UserContext } from "../../context/UserContext";

export const Infoinc = () => {
  const { user, modal, setModal, setInfoConfirm } = useContext(UserContext);
  const [infoDados, setinfoDados] = useState(false);
  const [openModalPerfil, setOpenModalPerfil] = useState(false);
  const [message, setMessage] = useState(null);


  console.log(infoDados)

  const handleChange = (event, field) => {
    const novoValor = event.target.value;
    setInfoConfirm((prevFormData) => ({
      ...prevFormData,
      [field]: novoValor,
    }));
  }

  const setModalConcluaRegistro = (param) => {
    if (param == 1)
      setModal(modal + 1)
    else if (param == 2)
      setModal(modal - 1)
    else if(param == 0)
      setModal(0)
  }

  return (
    <>
      {
        modal != 0 && (
          <div className="modal-card-conclua-registro">
            {
              modal == 1 && (
                <div className="card-conclua-registro">
                  <div className="top-card-conclua-registro">
                    <h1>Conclua o seu registro</h1>
                    <p>Finalize o seu cadastro para uma melhor experiência em nossa plataforma</p>
                  </div>
                  <div className="inputs-card-conclua-registro">
                    <p>Telefone ou celular</p>
                    <input className="nmr-telefone" type="tel" placeholder="Telefone / Celular" onChange={(event) => handleChange("telefone", event)}/>
                    <p>Data de nascimento</p>
                    <input className="data" type="date" />
                    <p>Sexo</p>
                    <select name="" id="" aria-placeholder="">
                      <option value="">Prefiro não dizer</option>
                      <option value="">Homem Macho</option>
                      <option value="">Mulher Feminina</option>
                    </select>
                  </div>
                  <div className="bottom-card-conclua-registro">
                    <p onClick={() => setModalConcluaRegistro(0)}>Deixar para depois</p>
                    <button onClick={() => setModalConcluaRegistro(1)}>Próximo</button>
                  </div>
                </div>
              )
            }
            
            {
              modal == 2 && (
                <div className="card-conclua-registro">
                  <div className="top-card-conclua-registro">
                    <h1>Conclua o seu registro</h1>
                    <p>Insira o seu endereço (você poderá adicionar outros posteriormente).</p>
                  </div>
                  <div className="inputs-card-conclua-registro">
                    <div className="grid-2x2-card-conclua-registro">
                      <input className="padrao-input-card-conclua-registro" type="number" />
                      <input className="padrao-input-card-conclua-registro" type="text" />
                      <input className="padrao-input-card-conclua-registro" type="text" />
                      <input className="padrao-input-card-conclua-registro" type="text" />
                      <input className="padrao-input-card-conclua-registro" type="number" />
                      <input className="padrao-input-card-conclua-registro" type="text" />
                    </div>
                  </div>
                  <div className="bottom-card-conclua-registro">
                    <p onClick={() => setModalConcluaRegistro(2)}>voltar</p>
                    <button>Finalizar</button>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </>
  )
}