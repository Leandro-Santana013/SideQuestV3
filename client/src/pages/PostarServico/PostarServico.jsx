import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation, } from "react-router-dom";
import { SidebarCliente, Header, TextInput, MenuBottomCliente } from "../../components";
import axios from "axios";
import JSZip from "jszip";
import imgApproved from "../../assets/approved.png";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import { FaCheck } from "react-icons/fa6";

import "./postarServico.css";
import {
  RiArrowLeftLine,
  RiListUnordered,
  RiQuestionLine,
  RiAttachment2,
} from "react-icons/ri";
import { UserContext } from "../../context/UserContext";

const PostarServico = () => {
  const {
    PostarServico,
    updatepostarServico,
    categorias,
    Servico,
    fetchData,
    cepError,
    setServico,
    setModalPostar,
    messageErrorPostar,
    errorPostar,
    form,
    setForm,
    modalPostar,
    locationuser,
    isCheckedLocation,
    setIsCheckedLocation,
    PostarServicoWithLoc,
    selectedImages,
    setSelectedImages,
  } = useContext(UserContext);

  const { state } = useLocation();
  const { id_profissional } = state || {};
  useEffect(() => {
    if (id_profissional) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", id_profissional)
        updatepostarServico({
            ...Servico,
            id_profissional
        });
    }
}, [id_profissional]);
  const handleCepChange = (e) => {
    const cep = e.target.value;
    setServico({ ...Servico, cep }); // Atualiza o estado do CEP
    const cepToFetch = cep; // Armazena o valor atual do CEP em uma variável local
    if (cep.length === 8) fetchData(cepToFetch); // Chama a função de busca de dados do CEP com o valor atual
  };

  const navigate = useNavigate();

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

  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [exceededLimit, setExceededLimit] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          imagesArray.push(reader.result);
          if (imagesArray.length === files.length) {
            const newImages = [...selectedImages, ...imagesArray];
            const limitedImages = newImages.slice(0, 5); // Limitando a 5 imagens
            if (newImages.length > 5) {
              setExceededLimit(true);
              setTimeout(() => {
                setExceededLimit(false);
              }, 4000);
              return;
            }
            setSelectedImages(limitedImages);
            setShowFilter(limitedImages.length > 3);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePrevimg = (e) => {
    e.preventDefault()
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextimg = (e) => {
    e.preventDefault()
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const deleteImage = (index) => {
    const updatedImages = selectedImages.filter((_, idx) => idx !== index);
    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    // Verificar se não há mais imagens selecionadas
    if (selectedImages.length === 0) {
      // Fechar o modal
      closeModal();
    } else {
      // Verificar se a imagem atualmente exibida no modal foi excluída
      if (currentImageIndex >= selectedImages.length) {
        // Atualizar o índice da imagem atual no modal para a última imagem disponível
        setCurrentImageIndex(selectedImages.length - 1);
      }
    }
  }, [selectedImages, currentImageIndex]);

  const zipImages = async () => {
    const zip = new JSZip();

    console.log("ssfdsfs", selectedImages);
    // Adicione as imagens ao arquivo ZIP
    selectedImages.forEach((image, index) => {
      zip.file(`image_${index}.png`, image.split("base64,")[1], {
        base64: true,
      });
    });

    try {
      // Gerar o arquivo ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const blobSize = content.size;

      // Criar um FileReader
      const reader = new FileReader();

      // Quando o FileReader carregar, converter para base64 e criar o objeto File
      reader.onload = () => {
        console.log(`Tamanho do arquivo ZIP: ${blobSize} bytes`);
        const base64String = reader.result.split(",")[1];
        const zipFile = {
          name: "images.zip",
          type: "application/zip",
          content: base64String,
        };

        // Converta zipFile para JSON
        const jsonZipFile = JSON.stringify(zipFile);

        // Atualizar o serviço com as imagens
        updatepostarServico({
          ...Servico,
          imagens: jsonZipFile,
        });
      };

      // Ler o conteúdo do arquivo como um ArrayBuffer
      reader.readAsDataURL(content);
    } catch (error) {
      console.error("Erro ao gerar o arquivo ZIP:", error);
    }
  };

  return (
    <>
      <Header />
      <SidebarCliente />
      <MenuBottomCliente />
      <div className="content-midia">
        <div className="main-content main-content">
          <div className="publicarHeader">
            <h2 className="publicarTitulo">Divulgue o serviço a ser feito</h2>
            <div className="publicarPassos">
              <div className={`publicar123 ${form === 1 ? "form" : ""}`}>1</div>
              <div className={`publicar123 ${form === 2 ? "form" : ""}`}>2</div>
            </div>
          </div>
          {errorPostar && (
            <div
              className={
                errorPostar
                  ? "message-error-postar-initial"
                  : "message-error-postar-end"
              }
            >
              {messageErrorPostar}
            </div>
          )}
          <form
            onSubmit={isCheckedLocation ? PostarServicoWithLoc : PostarServico}
            className="postarServico1"
          >
            {form === 1 && (
              <div>
                <div className="headerVoltar">
                  <div id="tata" className="btnVoltar" onClick={handleBefore}>
                    <RiArrowLeftLine className="iconeVoltar" />
                  </div>
                </div>
                <div className="left-rightPostar">
                  <div className="leftPostar">
                    {modalPostar && (
                      <>
                        <div className="fade">
                          <div className={`modal-postar-sucess`}>
                            <h3>Serviço postado</h3>
                            <img src={imgApproved} />
                            <p>Profissionas poderão vizualizar seu problema</p>
                            <Link to={"/homeCliente"}>
                              <button
                                className="close-modal-postar"
                                onClick={() => {
                                  setModalPostar(null);

                                  // Adicione esta linha para fechar o modal ao clicar em "Fechar"
                                }}
                              >
                                {" "}
                                Fechar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                    <h3 className="tituloServico">Título do serviço</h3>
                    <TextInput
                      className="componente-content-input input-busque-por-servicos"
                      name="titulo"
                      type="text"
                      size={{
                        width: "35vw",
                        height: "1.5vw",
                        padding: ".5vw 0 .5vw 0",
                      }}
                      placeholder="Exemplo: Pintura de parede"
                      onChange={(e) =>
                        updatepostarServico({
                          ...Servico,
                          titulo: e.target.value,
                        })
                      }
                    />

                    <div className="emergente-categorias">
                      <select
                        id="categoriaSelect"
                        className="categorias"
                        onChange={(e) =>
                          updatepostarServico({
                            ...Servico,
                            categoria: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled selected>
                          Selecione uma categoria
                        </option>
                        {categorias.map((categoria) => (
                          <option
                            key={categoria.cd_categoria} // Adicione a chave única aqui
                            name={categoria.ds_categoria}
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
                      name="dsServico"
                      type="text"
                      size={{ width: "35vw", height: "10vw" }}
                      placeholder={
                        "Exemplo: Eu preciso de um pintor para pintar uma parede externa de 4 metros de altura e 6 metros de largura. A parede é feita de tijolos e precisa ser limpa e preparada antes da pintura. Eu gostaria que a parede fosse pintada com tinta acrílica branca. Já comprei toda a tinta necessária, caso precise de mais tinta posso comprar."
                      }
                      onChange={(e) =>
                        updatepostarServico({
                          ...Servico,
                          dsServico: e.target.value,
                        })
                      }
                    />
                    <div className="content-img-button">
                      <input
                        type="file"
                        id="anexo"
                        className="anexo"
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple // Allow multiple file selection
                      />
                      <label htmlFor="anexo" className="anexoLabel">
                        Anexo
                        <RiAttachment2 className="iconAnexo" />
                      </label>

                      {locationuser && (
                        <div className="option-endereco-principal">
                          <label class="custom-checkbox">
                            <input type="checkbox"
                              id="loc"
                              checked={isCheckedLocation}
                              onChange={(e) => {
                                setIsCheckedLocation(e.target.checked);
                              }} />
                            <span class="checkmark">{isCheckedLocation ? <FaCheck /> : ''}</span>
                          </label>
                          <p>usar endereço principal</p>
                        </div>
                      )}

                      {selectedImages.slice(0, 2).map((image, index) => (
                        <div
                          key={index}
                          className="selected-image"
                          onClick={() => openModal(index)}
                        >
                          <img
                            src={image}
                            alt={`Selected ${index}`}
                            width="70"
                            height="70"
                          />
                        </div>
                      ))}

                      {selectedImages.slice(2, 3).map((image, index) => (
                        <div key={index + 2} className="selected-image">
                          <img
                            src={image}
                            alt={`Selected ${index + 2}`}
                            width="70"
                            height="70"
                          />
                          {selectedImages.length > 3 && (
                            <div className="filter">
                              +{selectedImages.length - 3}
                            </div>
                          )}
                        </div>
                      ))}

                      {modalOpen && (
                        <div className="fade-main-image-container">
                          <div className="main-image-container">
                            <button
                              className="fechar-fotos"
                              onClick={() => closeModal()}
                            >
                              <FaCircleXmark />
                            </button>
                            <div className="header-modal">

                              <p>Fotos selecionadas</p>
                            </div>
                            <div className="main-image-buttons">
                              <button
                                className="prev prev-next"
                                onClick={handlePrevimg}
                              >
                                <FaAngleLeft />

                              </button>
                              <div className="img-main-image-buttons">
                                <img
                                  src={selectedImages[currentImageIndex]}
                                  alt={`Selected ${currentImageIndex}`}
                                  className="main-image"
                                />
                              </div>

                              <button
                                className="next prev-next"
                                onClick={handleNextimg}
                              >
                                <FaAngleRight />
                              </button>
                            </div>
                            <div className="images-modal">
                              {selectedImages.slice(0, 5).map((image, index) => (
                                <div
                                  key={index}
                                  className="selected-image selected-image-modal"
                                  onClick={() => openModal(index)}
                                >
                                  <div className="image-delete-button">
                                    <div
                                      className="delete-image invisible"
                                      onClick={() => deleteImage(index)}
                                    >
                                      <FaRegTrashCan />
                                    </div>
                                    <img
                                      src={image}
                                      alt={`Selected ${index}`}
                                      width="100"
                                      height="100"
                                    ></img>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rightPostar">
                    {locationuser ? (
                      <>
                        <button
                          className="btnProximo"
                          type={isCheckedLocation ? "submit" : ""}
                          onClick={async () => {
                            if (!isCheckedLocation) {
                              if (selectedImages.length > 0) {
                                await zipImages(); // Espera a função zipImages() ser concluída antes de prosseguir
                              }
                              handleNext();
                            } else {
                              if (selectedImages.length > 0) {
                                console.log("3242134", selectedImages);
                                await zipImages(); // Espera a função zipImages() ser concluída antes de prosseguir
                              }
                              setSelectedImages([])
                              setServico({})
                            }
                          }}
                        >
                          {isCheckedLocation ? "Postar" : "Próximo"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btnProximo"
                          onClick={() => {
                            handleNext(); // Chama a função para avançar para o próximo formulário
                            if (selectedImages.length > 0) {
                              zipImages(); // Chama a função para zipar as imagens apenas se houver alguma imagem selecionada
                            }
                          }}
                        >
                          Próximo
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {form === 2 && (
              <div className="form2">
                <div className="headerVoltar">
                  <div className="btnVoltar" onClick={handleBefore}>
                    <RiArrowLeftLine className="iconeVoltar" />
                  </div>
                </div>
                <div className="left-rightPostar">
                  <div className="leftPostar">
                    {modalPostar && (
                      <>
                        <div className="fade">
                          <div className={`modal-postar-sucess`}>
                            <h3>Serviço postado</h3>
                            <img src={imgApproved} />
                            <p>Profissionas poderão vizualizar seu problema</p>
                            <Link to={"/homeCliente"}>
                              <button
                                className="close-modal-postar"
                                onClick={() => {
                                  setModalPostar(null); // Adicione esta linha para fechar o modal ao clicar em "Fechar"
                                }}
                              >
                                {" "}
                                Fechar
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                    <h3 className="tituloServico">Endereço</h3>
                    <div className="cep-estado">
                      <div>
                        <h4 className="postarH4">CEP</h4>
                        <div>
                          <TextInput
                            type="text"
                            name="cep"
                            autocomplete="off"
                            size={{
                              width: "14vw",
                              height: "1.5vw",
                              border: cepError
                                ? "2px solid red"
                                : "2px solid #eee",
                            }}
                            onChange={(e) => {
                              handleCepChange(e); // Chama a função handleCepChange existente
                              updatepostarServico({
                                ...Servico,
                                cep: e.target.value,
                              }); // Atualiza o estado do serviço com o novo valor do CEP
                            }}
                          />
                          {cepError && (
                            <p className="cepError">CEP incorreto</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="postarH4">Estado - Cidade</h4>
                        <TextInput
                          type="text"
                          name="estado_cidade"
                          size={{ width: "30vw", height: "1.5vw" }}
                          placeholder={""}
                          value={Servico.uf_localidade}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="bairro-rua">
                      <div>
                        <h4 className="postarH4">Bairro</h4>
                        <TextInput
                          type="text"
                          name="bairro"
                          autocomplete="off"
                          size={{ width: "24vw", height: "1.5vw" }}
                          placeholder={""}
                          value={Servico.bairro}
                          onChange={(e) => {
                            updatepostarServico({
                              ...Servico,
                              bairro: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <div>
                          <h4 className="postarH4">Nome da rua</h4>
                          <TextInput
                            type="text"
                            name="nmRua"
                            autocomplete="off"
                            size={{ width: "20vw", height: "1.5vw" }}
                            placeholder={""}
                            value={Servico.logradouro}
                            onChange={(e) => {
                              updatepostarServico({
                                ...Servico,
                                logradouro: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="num-complemento">
                      <div>
                        <h4 className="postarH4">Número da residência</h4>

                        <TextInput
                          type="number"
                          name="nmrResidencia"
                          autocomplete="off"
                          size={{ width: "8vw", height: "1.5vw" }}
                          placeholder={""}
                          onChange={(e) => {
                            updatepostarServico({
                              ...Servico,
                              nmrResidencia: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="postarH4">Complemento</h4>
                        <TextInput
                          type="text"
                          name="complemento"
                          autocomplete="off"
                          size={{ width: "20vw", height: "1.5vw" }}
                          placeholder={""}
                          onChange={(e) => {
                            updatepostarServico({
                              ...Servico,
                              complemento: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="linha-postar" id="rightPostar2">
                      <button className="btnProximo" type="submit">
                        Postar
                      </button>
                    </div>
                  </div>

                  {/* {modalOpen && (
  <div className="modal-confirmacao">
    <div>
    <h2>Confirmação</h2>
    <p>Deseja realmente publicar o serviço?</p>
    <div>
      <div className="buttons-modal">
      <button onClick={() => closeModal()}>Cancelar</button>
      <button onClick={handleSubmit()}>Confirmar</button>
    </div>
    </div>
  </div>
  </div>
  )} */}
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
