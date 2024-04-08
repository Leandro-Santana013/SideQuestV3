import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SidebarCliente, Header, TextInput } from "../../components";
import axios from "axios";
import Cookies from "js-cookie";
import JSZip from "jszip";


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
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [complemento, setComplemento] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    titulo: null,
    dsServico: null,
    cep: null,
    uf_localidade: null,
    logradouro: null,
    bairro: null,
    nmrResidencia: null,
    categoriaSelecionada: null,
    complemento: null,
    idCliente: null,
    email: null,
    imagens: null,
  });

  const getCookieData = () => {
    const userDataString = decodeURIComponent(Cookies.get("user"));
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Atualize o estado formData com os dados do cookie
      setFormData((prevFormData) => ({
        ...prevFormData,
        idCliente: userData.id_cliente,
        email: userData.email,
      }));
      console.log(userData.id_cliente);
      console.log(userData.email);
    }
  };

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
  
    // Gerar o arquivo ZIP
    await zipImages();
  
    try {
      // Enviar o formulário com o estado formData atualizado
      const response = await axios.post(
        "http://localhost:5000/auth/postarServico",
        formData
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

  const handleComplemento = (event) => {
    // Permitir que o usuário edite o campo "Estado - Cidade"
    setFormData((prevFormData) => ({
      ...prevFormData,
      complemento: event.target.value,
    }));
  };

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/selectCategoria"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
      getCookieData();
    };

    // Chama a função para buscar as categorias
    carregarCategorias();
  }, []);

  const handleCategoriaChange = (event) => {
    const selectedCategoria = event.target.value;
    setCategoriaSelecionada(selectedCategoria);

    // Atualize o estado categoriaSelecionada no formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoriaSelecionada: selectedCategoria,
    }));
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const [selectedImages, setSelectedImages] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [exceededLimit, setExceededLimit] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null);
  

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

  const handlePrevimg = () => {
  setCurrentImageIndex((prevIndex) =>
    prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
  );
};

const handleNextimg = () => {
  setCurrentImageIndex((prevIndex) =>
    prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
  );
};

const deleteImage = (index) => {
  const updatedImages = selectedImages.filter((_, idx) => idx !== index);
  setSelectedImages(updatedImages);
}



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

  // Adicione as imagens ao arquivo ZIP
  selectedImages.forEach((image, index) => {
    zip.file(`image_${index}.png`, image.split("base64,")[1], { base64: true });
  });

  try {
    // Gerar o arquivo ZIP
    const content = await zip.generateAsync({ type: "blob" });
    console.log("Conteúdo do arquivo ZIP:", content);

    // Adicione o arquivo ZIP ao FormData
    const zipFile = new File([content], "images.zip");

    // Atualize o estado formData com o arquivo ZIP
    setFormData(prevFormData => ({
      ...prevFormData,
      imagens: zipFile
    }));

    console.log("Objeto FormData após adicionar arquivo ZIP:", formData);

  } catch (error) {
    console.error("Erro ao gerar o arquivo ZIP:", error);
  }
};



  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content main-content">
          <div className="publicarHeader">
            <h2 className="publicarTitulo">Publique um serviço</h2>
            <div className="publicarPassos">
              <div className={`publicar123 ${form === 1 ? "form" : ""}`}>1</div>
              <div className={`publicar123 ${form === 2 ? "form" : ""}`}>2</div>
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
                    <h3 className="tituloServico">Título do serviço</h3>
                    <TextInput
                      name="titulo"
                      type="text"
                      size={{ width: "35vw", height: "3vw" }}
                      onChange={handleFormSubmit}
                      placeholder={"Busque por serviços"}
                      value={formData.titulo}
                    />

                    <div className="emergente-categorias">
                      <select
                        id="categoriaSelect"
                        value={categoriaSelecionada}
                        onChange={handleCategoriaChange}
                        className="categorias"
                      >

                      <option value="" disabled selected>Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                          <option
                            name={categoria.ds_categoria}
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
                      name="dsServico"
                      type="text"
                      size={{ width: "35vw", height: "10vw" }}
                      onChange={handleFormSubmit}
                      placeholder={
                        "Exemplo: Eu preciso de um pintor para pintar uma parede externa de 4 metros de altura e 6 metros de largura. A parede é feita de tijolos e precisa ser limpa e preparada antes da pintura. Eu gostaria que a parede fosse pintada com tinta acrílica branca. Já comprei toda a tinta necessária, caso precise de mais tinta posso comprar."
                      }
                      value={formData.dsServico}
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
                        <div className="main-image-container">
                          <div className="header-modal">
                            <button
                              className="fechar-fotos"
                              onClick={() => closeModal()}
                            >
                              x
                            </button>
                          </div>
                          <div className="main-image-buttons">
                            <button
                              className="prev prev-next"
                              onClick={handlePrevimg}
                            >
                              &#10094;
                            </button>
                            <img
                              src={selectedImages[currentImageIndex]}
                              alt={`Selected ${currentImageIndex}`}
                              className="main-image"
                            />

                            <button
                              className="next prev-next"
                              onClick={handleNextimg}
                            >
                              &#10095;
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
                                  <div className="delete-image invisible" onClick={() => deleteImage(index)}>
                                    {" "}
                                    Excluir{" "}
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
                      )}
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
                    <div className="cep-estado">
                      <div>
                        <h4 className="postarH4">CEP</h4>
                        <div>
                          <TextInput
                            type="text"
                            name="cep"
                            size={{
                              width: "14vw",
                              height: "3vw",
                              border: cepError
                                ? "1px solid red"
                                : "1px solid black",
                            }}
                            onChange={handleCepChange}
                            placeholder={""}
                            value={cep}
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
                          size={{ width: "30vw", height: "3vw" }}
                          onChange={handleEstadoCidadeChange}
                          placeholder={""}
                          value={formData.uf_localidade}
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
                          size={{ width: "24vw", height: "3vw" }}
                          onChange={handlebairro}
                          placeholder={""}
                          value={formData.bairro}
                        />
                      </div>
                      <div>
                        <div>
                          <h4 className="postarH4">Nome da rua</h4>
                          <TextInput
                            type="text"
                            name="nmRua"
                            size={{ width: "20vw", height: "3vw" }}
                            onChange={handlelogradouro}
                            placeholder={""}
                            value={formData.logradouro}
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
                          size={{ width: "8vw", height: "3vw" }}
                          onChange={handleFormSubmit}
                          placeholder={""}
                          value={formData.nmrResidencia}
                        />
                      </div>
                      <div>
                        <h4 className="postarH4">Complemento</h4>
                        <TextInput
                          type="text"
                          name="complemento"
                          size={{ width: "20vw", height: "3vw" }}
                          onChange={handleComplemento}
                          placeholder={""}
                          value={formData.complemento}
                        />
                      </div>
                    </div>
                    <div className="linha-postar" id="rightPostar2">
                      <button className="btnProximo" onClick={handleSubmit}>
                        
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