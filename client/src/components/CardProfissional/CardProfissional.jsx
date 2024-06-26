import React, { useEffect, useState } from "react";
import "./cardProfissional.css";
import imgPerfil from "../../assets/icone-perfil.png";
import imgMedalha10K from "../../assets/medalha10k.png";
import imgMedalhaOuro from "../../assets/medalhaouro.png";
import imgMedalhaBronze from "../../assets/medelhabronze.png";
import imgCertificado from "../../assets/certificado.png";
import { TextInputBusca } from "../index";
import axios from 'axios';
import { Link } from "react-router-dom";
import { RiFilter2Fill, RiStarFill } from "react-icons/ri";
import { getRequest } from "../../utils/services";


export const CardProfissional = () => {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [filtrados, setFiltrado] = useState(null);
  const [modal, setModal] = useState(false);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
  const [coresBotoes, setCoresBotoes] = useState({});
  const [busca, setBusca] = useState("");

  const openModal = () => {
    setModal(true);
  };

  const resetCoresBotoes = () => {
    setCoresBotoes({
      botao1: 'var(--verde)',
      botao2: 'var(--verde)',
      botao3: 'var(--verde)',
    });
  };

  const closeModal = () => {
    setModal(false);
    setFiltrosSelecionados([]);
    aplicarFiltros();
    resetCoresBotoes();
  };

  const aplicarFiltros = () => {
    const parametrosFiltro = {
      maisBemAvaliados: filtrosSelecionados.includes('maisBemAvaliados'),
      maisServicosPrestados: filtrosSelecionados.includes('maisServicosPrestados'),
      profissionaisFemininas: filtrosSelecionados.includes('profissionaisFemininas'),
    };
    setFiltrado(parametrosFiltro);
  };

  const fetchDataFromBackend = async () => {
    try {
      const response = await getRequest("/user/profissionaisCard");
      console.log("resss", response)
      setDadosIniciais(response)
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, [filtrados]);

  const filtrarCards = (filtro, botaoId) => {
    let novosFiltros = [...filtrosSelecionados];
    if (novosFiltros.includes(filtro)) {
      novosFiltros = novosFiltros.filter(f => f !== filtro);
    } else {
      novosFiltros.push(filtro);
    }
    setFiltrosSelecionados(novosFiltros);
    alternarCor(botaoId);
  };

  const alternarCor = (id) => {
    setCoresBotoes(prevState => {
      const novaCor = prevState[id] === 'var(--azul)' ? 'var(--verde)' : 'var(--azul)';
      return { ...prevState, [id]: novaCor };
    });
  };

  const renderizarCards = () => {
    return dadosIniciais
      .filter(profissional => {
        if (profissional.nm_profissional) {
          if (!profissional.nm_profissional.toLowerCase().includes(busca.toLowerCase()) && !profissional.ds_biografia?.toLowerCase().includes(busca.toLowerCase())) {
            return false;
          }
        } else return false;



        if (filtrosSelecionados.includes('profissionaisFemininas') && profissional.sg_sexoProfissional !== 'F') {
          return false;
        }

        if (filtrosSelecionados.includes('maisBemAvaliados') && profissional.media_avaliacoes < 4) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filtrosSelecionados.includes('maisServicosPrestados')) {
          return b.num_servicos_terminados - a.num_servicos_terminados;
        } else {
          return b.media_avaliacoes - a.media_avaliacoes;
        }
      })
      .map(profissional => (
        <div className="card-profissional">
          <Link to={`/homeCliente/perfilProfissional/${profissional.id_profissional}`} key={profissional.id_profissional}>
          <div className="tamplate-img">
            <img src={profissional.img_profissional ? profissional.img_profissional : imgPerfil} alt="Imagem de perfil" />
            <div className="perfil-avaliado">
              <h2>{profissional.nm_profissional}</h2>
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <RiStarFill
                    key={index}
                    className={`ri-star-s-fill ${index < profissional.media_avaliacoes ? "ava" : ""}`}
                  ></RiStarFill>
                ))}
              </div>
            </div>
          </div>
          <div className="profissoes-card-profissional">
            {profissional.tb_profissional_categoria.map((categoria, index) => (
    index < 3 ?
    <p key={categoria.id_categoria} className="tooltip">
      {categoria.tb_categorium.ds_categoria}
      <span className="tooltiptext">{categoria.tb_categorium.ds_categoria}</span>
    </p>
    :
    index === 3 ?
    <p key={categoria.id_categoria} className="tooltip">
      +{profissional.tb_profissional_categoria.length - 3}
      <span className="tooltiptext">+{profissional.tb_profissional_categoria.length - 3}</span>
    </p>
    :
    null
  ))}
          </div>
          <div className="desc-cliente">
            <p className="desc">{profissional.ds_biografia ? profissional.ds_biografia : "Não possui descrição"}</p>
          </div>
          <div className="bottom-card-profissional"> 
              <button className="btn-ver-mais">Ver mais</button>
          </div>
          </Link>
        </div>

      ));
  };

  return (
    <section className="area-servicos">
      <div className="input-filtros">
        <TextInputBusca
          placeholder={"Encontre os melhores profissionais"}
          value={busca}
          onChange={(value) => setBusca(value)}
        />
        <div className="ifopenf">
          <div className="filtros" onClick={openModal} style={{ display: modal === true ? "none" : 'flex' }}>
            <p>Filtros</p>
            <RiFilter2Fill className="iconFilter" />
          </div>
          {modal && (
            <div className="modal">
              <div className="modal-content">
                <div className="container-card-filtros">
                  <button className="card-filtro" onClick={() => { filtrarCards('maisBemAvaliados', 'botao1'); }} style={{ backgroundColor: coresBotoes['botao1'] || 'var(--verde)' }}>
                    <p><strong>4+ estrelas</strong></p>
                  </button>
                  <button className="card-filtro" onClick={() => { filtrarCards('maisServicosPrestados', 'botao2') }} style={{ backgroundColor: coresBotoes['botao2'] || 'var(--verde)' }}>
                    <p><strong>+ serviços prestados</strong></p>
                  </button>
                  <button className="card-filtro" onClick={() => { filtrarCards('profissionaisFemininas', 'botao3'); }} style={{ backgroundColor: coresBotoes['botao3'] || 'var(--verde)' }}>
                    <p><strong>Profissionais femininas</strong></p>
                  </button>
                </div>
                <button className="btn-close-modal" onClick={() => { closeModal(); aplicarFiltros(); }}>Fechar</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cards-container">
        {dadosIniciais.length === 0 ? (
          <div className="sem-profissionais">
            <p>Nenhum profissional encontrado.</p>
          </div>
        ) : (
          renderizarCards()
        )}
      </div>
    </section>
  );
};
