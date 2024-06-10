import React, { useState, useEffect, useContext } from "react";

import { SidebarProfissional, Header } from "../../components/index";
import { Link, useParams } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import iconePerfil from "../../assets/icone-perfil.png";
import { postRequest, getRequest } from "../../utils/services";
import { RiStarFill } from "react-icons/ri";
import JSZip from "jszip";
import base64js from "base64-js";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

SwiperCore.use([Navigation]);
const VizualizarServicoAtivoCliente = () => {
    const { id } = useParams();
    const { pro } = useContext(UserContext);
    const { createChat } = useContext(ChatContext);
    const [servico, setServico] = useState(null);
    const [imagesServico, setImagesServico] = useState([]);
    const [modal, setModal] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest(`/professional/servico/${id}`);
                setServico(response);
                console.log("Serviço:", response);
            } catch (error) {
                console.error("Erro ao buscar informações do serviço:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleClick = (u) => {
        if (user !== null) {
            createChat(user.id_cliente, u);
        }
    };

    const handleClickaceitar = async (id) => {
        if (pro && pro.id_profissional && servico) {
             await postRequest(`/professional/servico/aceitar`, { id_profissional: id, id_servico: servico.id_postagemServico });
            setModal(true)
        }
    };

    useEffect(() => {
        const unzipData = async () => {
            if (servico?.img_servico) {
                try {
                    const imgServicoObj = JSON.parse(servico.img_servico);
                    if (imgServicoObj.content) {
                        const zip = new JSZip();
                        const arrayBuffer = base64js.toByteArray(imgServicoObj.content).buffer;
                        const unzipped = await zip.loadAsync(arrayBuffer);

                        const imagesArray = [];
                        for (const filename in unzipped.files) {
                            const fileData = await unzipped.files[filename].async("base64");
                            imagesArray.push(`data:image/png;base64,${fileData}`);
                        }

                        setImagesServico(imagesArray);
                    } else {
                        console.error("A propriedade 'content' não foi encontrada em img_servico");
                    }
                } catch (error) {
                    console.error("Erro ao descompactar as imagens:", error);
                }
            }
        };

        unzipData();
    }, [servico]);

    console.log(servico, 'servicos')

    return (
        <>
            <Header />
            <SidebarProfissional />
            <div className="content-midia">
                <div className="main-content">
                {modal && (
                      <>
                        <div className="fade">
                          <div className={`modal-postar-sucess`}>
                            <h3>Serviço aceito</h3>
                            <RiVerifiedBadgeFill/>
                            <p></p>
                            <Link to={"/homeProfissionais"}>
                              <button
                                className="close-modal-postar"
                                onClick={async() => {                         
                                 await setModal(false); // Adicione esta linha para fechar o modal ao clicar em "Fechar"
                                 window.location.reload()
                                }}
                              >
                                Fechar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="card-visualizar">
                        {servico && (
                            <>
                                <div className="card-header-servico">
                                    <div className="titulo-servico">
                                        <h2>{servico.ds_titulo}</h2>
                                        <h3>Pintura</h3>
                                    </div>
                                    <div className="action-buttons-header-servico">
                                        <button onClick={() => handleClickaceitar(user.id_cliente)}>Aceitar</button>
                                        <button onClick={() => handleClick(servico.id_profissional)}>Chat</button>
                                    </div>
                                </div>
                                <hr />
                                <div className="card-main-servico">
                                    <div className="proposta-servico">
                                        <div className="perfil-avaliacao">
                                            <div className="avaliacao-icon-nome">
                                                <img src={servico['tb_cliente.img_cliente'] ? servico.img_cliente : iconePerfil} alt="icon-perfil" />
                                                <div className="nome-avaliacao">
                                <p>{servico['tb_cliente.nm_cliente']}</p>
                                                    <div className="avaliacao">
                                                        <p>4.9</p>
                                                        <span className="feedback-score">
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="distancia">
                                                <MdOutlineLocationOn/>
                                                <p>4km</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="desc-servico">
                                        <div className="descricao">
                                            <h3>Descrição</h3>
                                            <p>{servico.ds_servico}</p>
                                        </div>
                                        <h3>Imagens anexadas a postagem</h3>
                                        <div className="images-servico">
                                            {imagesServico.length > 0 ? (
                                                <Swiper spaceBetween={10} slidesPerView={3}>
                                                    {imagesServico.map((image, index) => (
                                                        <SwiperSlide key={index}>
                                                            <img src={image} alt={`Imagem do serviço ${index + 1}`} className="imagem-servico" />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            ) : (
                                                <p>Nenhuma imagem anexada ao serviço</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VizualizarServicoAtivoCliente;
