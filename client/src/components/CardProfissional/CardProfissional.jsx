
import React, { useEffect, useState,  useContext} from "react";
import "./cardProfissional.css";
import imgPerfil from "../../assets/icone-perfil.png";
import imgMedalha10K from "../../assets/medalha10k.png";
import imgMedalhaOuro from "../../assets/medalhaouro.png";
import imgMedalhaBronze from "../../assets/medelhabronze.png";
import imgCertificado from "../../assets/certificado.png";
import { TextInputBusca } from "../index";
import axios from 'axios';
import { UserContext } from "../../context/UserContext";
import { RiFilter2Fill, RiStarFill } from "react-icons/ri";

export const CardProfissional = React.memo(() => {
  const [busca, setBusca] = useState();
  const handleBuscaChange = (event) => {
    setBusca(event.target.value);
  };
  

  const { loginUser } = useContext(UserContext);

  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [filtrados, setFiltrado] = useState(null);
  const [modal, setModal] = useState(false);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
  let paragrafo = document.querySelector(".desc");
  let botaoVerMais = document.querySelector(".vma-vme");

  const openModal = () => {
    setModal(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModal(false);
    setFiltrosSelecionados([]); // Redefine os filtros ao fechar o modal
    aplicarFiltros(); // Aplica os filtros redefinidos
  };
  
  // Função para aplicar os filtros selecionados
  const aplicarFiltros = () => {
  // Lógica para aplicar os filtros selecionados
  const parametrosFiltro = {
    maisBemAvaliados: filtrosSelecionados.includes('maisBemAvaliados'),
    maisServicosPrestados: filtrosSelecionados.includes('maisServicosPrestados'),
    profissionaisFemininas: filtrosSelecionados.includes('profissionaisFemininas'),
  };
  setFiltrado(parametrosFiltro);
  };

  // Modifique a função fetchDataFromBackend para passar os filtros como parâmetros
  const fetchDataFromBackend = async () => {
    try {
      // Verifica se filtrados é null antes de passá-lo como parâmetro
      const response = await axios.get(
        "http://localhost:5000/user/profissionaisCard",
        { params: { ...filtrados, busca: busca || '' } } // Define um valor padrão para busca
      );
      setDadosIniciais(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
      // Tratamento de erro adicional conforme necessário
    }
  };
  

  useEffect(() => {
    fetchDataFromBackend();
  }, [loginUser, filtrados]);

  

  // Atualize a função filtrarCards para adicionar ou remover filtros selecionados

// Atualize a função filtrarCards para adicionar ou remover filtros selecionados
const filtrarCards = (filtro) => {
  let novosFiltros = [...filtrosSelecionados];
  if (novosFiltros.includes(filtro)) {
    novosFiltros = novosFiltros.filter(f => f !== filtro);
  } else {
    novosFiltros.push(filtro);
  }
  setFiltrosSelecionados(novosFiltros);
};

const [coresBotoes, setCoresBotoes] = useState({});

// Função para alternar a cor do botão
const alternarCor = (id) => {
  setCoresBotoes(prevState => {
    const novaCor = prevState[id] === 'var(--verde)' ? 'var(--azul)' : 'var(--verde)';
    return { ...prevState, [id]: novaCor };
  });
};

return (
  <section className="area-servicos">
    <div className="input-filtros">
      <TextInputBusca placeholder={"Encontre profissionais"} />
      <div className="ifopenf">
        <div className="filtros" onClick={openModal}>
          <p>Filtros</p>
          <RiFilter2Fill className="iconFilter" />
        </div>
        {modal && (
          <div className="modal">
            <div className="modal-content">
              <span>Filtre por:</span>
              <div className="container-card-filtros">
                <button
                  className="card-filtro"
                  onClick={() => {
                    filtrarCards("maisBemAvaliados");
                  }}
                  style={{
                    backgroundColor: filtrosSelecionados.includes("maisBemAvaliados")
                      ? "var(--azul)"
                      : "var(--verde)",
                  }}
                >
                  <p>
                    <strong>Mais bem avaliados</strong>
                  </p>
                </button>
                <button
                  className="card-filtro"
                  onClick={() => {
                    filtrarCards("maisServicosPrestados")
                  }}
                  style={{
                    backgroundColor: filtrosSelecionados.includes("maisServicosPrestados")
                      ? "var(--azul)"
                      : "var(--verde)",
                  }}
                >
                  <p>
                    <strong>4+ estrelas</strong>
                  </p>
                </button>
                <button
                  className="card-filtro"
                  onClick={() => {
                    filtrarCards("profissionaisFemininas")
                  }}
                  style={{
                    backgroundColor: filtrosSelecionados.includes("profissionaisFemininas")
                      ? "var(--azul)"
                      : "var(--verde)",
                  }}
                >
                  <p>
                    <strong>Somente profissionais femininas</strong>
                  </p>
                </button>
              </div>
              <button className="btn-close-modal" onClick={() => { closeModal(); aplicarFiltros() }}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
    {dadosIniciais.length === 0 ? (
      <div className="sem-profissionais">
        <p>Nenhum profissional encontrado.</p>
      </div>
    ) : (
      dadosIniciais.sort((a, b) => b.media_avaliacoes - a.media_avaliacoes).map((profissional) => {
        if (filtrosSelecionados.includes('profissionaisFemininas') && profissional.sg_sexoProfissional !== 'F') {
          return null;
        }

        if (filtrosSelecionados.includes('maisBemAvaliados') && profissional.media_avaliacoes < 4) {
          return null;
        }

        // Se o filtro de mais serviços prestados estiver ativado, não exibe os profissionais com menos de 10 serviços realizados -- ALTERAR
        if (filtrosSelecionados.includes('maisServicosPrestados') && profissional.num_servicos_terminados < 10) {
          return null;
        }

        // Fechamento da chave final
        return (
          <div className="card-profissional" key={profissional.id_profissional}>
            <div className="tamplate-img">
              <img src={imgPerfil} alt="Imagem de perfil" />
            </div>
            <div className="desc-cliente">
              <div className="perfil-avaliado">
                <h2>{profissional.nm_profissional}</h2>
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <RiStarFill
                      key={index}
                      className={`ri-star-s-fill ${index < profissional.media_avaliacoes ? "ava" : ""
                        }`}
                    ></RiStarFill>
                  ))}
                </div>
              </div>
              <div className="emblemas">
                <img src={imgMedalha10K} alt="Medalha 10k" />
                <img src={imgMedalhaOuro} alt="Medalha de Ouro" />
                <img src={imgMedalhaBronze} alt="Medalha de Bronze" />
              </div>
              <div className="content-desc">
                <p className="desc">{profissional.ds_biografia ? profissional.ds_biografia : "Não possui descrição"}</p>
                <span className="vma-vme">ver mais</span>
              </div>
            </div>
            <div className="contrate">
              <button className="btn-contratar">Contratar</button>
              <div className="serv-realizados">
                <img src={imgCertificado} alt="certificado" />
                <p>
                  Serviços realizados: {profissional.num_servicos_terminados}
                </p>
              </div>
            </div>
          </div>
        );
      })
    )}
  </section>
)
});
