import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import './infoInc.css';
export const Infoinc = () => {
  const [infoDados, setinfoDados] = useState(false);
  const [openModalPerfil, setOpenModalPerfil] = useState(false);
  const [message, setMessage] = useState(null);


  console.log(infoDados)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="modal-card-conclua-registro">
        <div className="card-conclua-registro">
          <div className="top-card-conclua-registro">
            <h1>Conclua o seu registro</h1>
            <p>Finalize o seu cadastro para uma melhor experiência em nossa plataforma</p>
          </div>
          <div className="inputs-card-conclua-registro">
            <input className="nmr-telefone" type="tel" placeholder="Telefone / Celular" />
            <input className="data" type="date" />
            <select name="" id="" aria-placeholder="">
              <option value="">Prefiro não dizer</option>
              <option value="">Homem Macho</option>
              <option value="">Mulher Feminina</option>
            </select>
          </div>
          <div className="bottom-card-conclua-registro">
            <p>Deixar para depois</p>
            <button>Próximo</button>
          </div>
        </div>

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
            <p>voltar</p>
            <button>Finalizar</button>
          </div>
        </div>
      </div>
    </>
  )
}