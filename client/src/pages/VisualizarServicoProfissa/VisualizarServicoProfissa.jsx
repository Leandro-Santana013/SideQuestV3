import React, { useState, useEffect, useContext } from "react";
import "./VisualizarServicoProfissa.css";
import { SidebarProfissional, Header } from "../../components/index";
import { Link, useParams } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";
import { ProfessionalContext } from "../../context/ProfissionalContext";
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
const VisualizarServicoProfissa = () => {
    const { id } = useParams();
    const { pro, setnum, setServicosEnd } = useContext(ProfessionalContext);
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
        if (pro !== null) {
            createChat(pro.id_profissional, u);
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
                                    <RiVerifiedBadgeFill style={{width: '10vw', height: '10vw', color: '#3CBC8C'}}/>
                                    <p></p>
                                    <Link to={"/homeProfissionais"}>
                                        <button
                                            className="close-modal-postar"
                                            onClick={async () => {
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
                    {servico && (
                    <div className="service-container">
                        <div className="service-header">
                            <div className="service-info" style={{display: 'flex', flexDirection: 'column'}}>
                                <h1 style={{margin: 0}}>
                                    {servico.ds_titulo}{" "}
                                </h1>
                                <p style={{display: 'flex', alignItems: 'center', margin: 0}}>
                                    <strong><p style={{fontWeight: '600'}}>{servico.nm_cliente}</p></strong>
                                    <i className="location-icon" style={{display: 'flex', alignItems: 'center',}}>
                                        <MdOutlineLocationOn />
                                        <p style={{display: 'flex', alignItems: 'center'}}>4km</p>
                                    </i>
                                </p>
                            </div>
                            <div className="actions-buttons-service">
                                <button className="action-button-service" onClick={() => handleClickaceitar(pro.id_profissional)}>Aceitar</button>
                                <button className="action-button-service" onClick={() => handleClick(servico.id_cliente)}>Chat</button>
                            </div>
                        </div>
                        <div className="row-section">
                            <div className="service-section info-section-service">
                                <div className="section-header">
                                    <h2>Descrição do serviço</h2>
                                </div>
                                <div className="section-content">

                                    <p>{servico.ds_servico}</p>
                                </div>
                            </div>
                            <div className="service-section areas-section">
                                <div className="section-header">
                                    <h2>Categoria</h2>
                                </div>
                                <div className="section-content tags-service">
                                    <p className="tag">{servico.ds_categoria}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row-section">
                            <div className="service-section  gallery-section">
                                <div className="section-header">
                                    <h2>Imagens do serviço</h2>
                                    <p>({imagesServico?.length})</p>
                                </div>
                                <div className="section-content">
                                    <div className="gallery">
                                        {imagesServico.length > 0 ? (              
                                                imagesServico.map((image, index) => (
                                                        <img src={image} alt={`Imagem do serviço ${index + 1}`} className="imagem-servico" />
                                                ))
                                        ) : (
                                            <p>Nenhuma imagem anexada ao serviço</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                
            </div>
                                    
        </>
    );
};

export default VisualizarServicoProfissa;
