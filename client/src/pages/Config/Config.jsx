import { useContext, useRef, useState } from "react";
import {
  Header,
  SidebarCliente,
  ImageCropper,
  TextInput,
} from "../../components";
import "./config.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

import imgPerfil from "../../assets/icone-perfil.png";

const Config = () => {
  const avatarUrl = useRef(imgPerfil);
  const {
    user,
    logoutUser,
    setChangedUserData,
    changedUserData,
    functionUpdateInfoUser,
    showModal,
    setShowModal,
  } = useContext(UserContext);

  const updateUserData = (newData) => {
    const changes = {};
    changes.id_cliente = user.id_cliente;
    if (newData.name !== user.name) {
      changes.name = newData.name;
    }
    if (newData.email !== user.email) {
      changes.email = newData.email;
    }
    if (newData.numero !== user.numero) {
      changes.numero = newData.numero;
    }
    if (newData.foto !== imgPerfil && newData.foto !== user.foto) {
      changes.foto = newData.foto;
      console.log("Tamanho da imagem:", newData.foto.length);
    }
    setChangedUserData(changes);
    if (Object.keys(changes).length > 0) {
      setShowModal(true); // Mostra o modal se houver alterações
    }
    setChangedUserData(changes);
  };

  const updatefoto = (ImgSrc) => {
    avatarUrl.current.src = ImgSrc; // Atualizando a imagem de perfil
    updateUserData({ ...changedUserData, foto: ImgSrc });
  };

  const handleFieldChange = (field, event) => {
    const newValue = event.target.value;
    updateUserData({
      ...changedUserData,
      [field]: newValue,
    });
  };


  const deleteUpdate = () => {
    avatarUrl.current.src = user.img_cliente ? user.img_cliente : imgPerfil;
    setChangedUserData(null);
    setShowModal(false);
    setModalEditar(false);
  };

  /***************************************************/

  const [modalEditar, setModalEditar] = useState(false);
  const handleSave = () => {
    functionUpdateInfoUser();
    setModalEditar(false); // Define o estado modalEditar de volta para false
  };
  /***************************************************/

  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="cabecalho-editar">
              <div className="area-img-perfil-edit">
                <img
                  id="img"
                  htmlFor="comp"
                  ref={avatarUrl}
                  src={user.img_cliente ? user.img_cliente : imgPerfil}
                  alt="Imagem de perfil"
                  className="img-config-perfil"
                  style={{
                    objectFit: "contain",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                  }}
                />
                <ImageCropper updatefoto={updatefoto} />
              </div>
            </div>
            <div className="sessao-config">
              <div className="edit-infoPessoais">
                <div className="header-edit-info-pessoais">
                  <div>
                    <h2>Informações Pessoais</h2>
                    <h3>Essas informações não estão públicas</h3>
                  </div>
                  <button onClick={() => setModalEditar(true)}>Editar</button>
                </div>

                <div className="input-pessoais">
                  <div className="input-nome-num">
                    <p>Nome</p>
                    {modalEditar ? (
                      <input
                        type="text"
                        id="input-nome"
                        value={(changedUserData && changedUserData.name) || user.nm_cliente}

                        onChange={(event) => handleFieldChange("name", event)}
                      />
                    ) : (
                      <span>{user.nm_cliente}</span>
                    )}

                    {user && user.nmr_telefoneCliente && (<>
                      <p>número</p>
                      {modalEditar ? (
                        <input
                          type="text"
                          id="input-num"
                          value={(changedUserData && changedUserData.numero) || user.nmr_telefoneCliente}

                          onChange={(event) => handleFieldChange("numero", event)}
                        />
                      ) : (
                        <p>{user.nmr_telefoneCliente}</p>
                      )}
                    </>)
                    }
                  </div>
                  <div className="input-email-local">
                    <p>Email</p>
                    {modalEditar ? (
                      <input
                        type="text"
                        id="input-num"
                        value={(changedUserData && changedUserData.email) || user.cd_emailCliente}
                        onChange={(event) => handleFieldChange("email", event)}
                      />
                    ) : (
                      <span>{user.cd_emailCliente}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="edit-info-endereco-principal">
                <div className="leftPostar leftPostar-de-config">
                  {/* {modalPostar && (
                      <>
                        <div className="fade">
                          <div className={`modal-postar-sucess`}>
                            <h3>Serviço postado</h3>
                            <img src={imgApproved} />
                            <p>Profissionas poderão vizualizar seu problema</p>
                            <Link to={"/homeCliente"}>
                              <button className="close-modal-postar" onClick={() => {
                                setModalPostar(null); // Adicione esta linha para fechar o modal ao clicar em "Fechar"
                              }}> Fechar</button></Link>
                          </div>
                        </div>
                      </>
                    )} */}
                  <h2>Endereço Principal</h2>
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
                            // border: cepError
                            //   ? "2px solid red"
                            //   : "2px solid #eee",

                          }}
                        // onChange={(e) => {
                        //   handleCepChange(e); // Chama a função handleCepChange existente
                        //   updatepostarServico({ ...Servico, cep: e.target.value }); // Atualiza o estado do serviço com o novo valor do CEP
                        // }}
                        />
                        {/* {cepError && (
                            <p className="cepError">CEP incorreto</p>
                          )} */}
                      </div>
                    </div>
                    <div>
                      <h4 className="postarH4">Estado - Cidade</h4>
                      <TextInput
                        type="text"
                        name="estado_cidade"
                        size={{ width: "30vw", height: "1.5vw" }}
                        placeholder={""}
                        // value={Servico.uf_localidade}
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
                      // value={Servico.bairro}
                      // onChange={(e) => {
                      //   updatepostarServico({ ...Servico, bairro: e.target.value });
                      // }}
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
                        // value={Servico.logradouro}
                        // onChange={(e) => {
                        //   updatepostarServico({ ...Servico, logradouro: e.target.value });
                        // }}
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
                      // onChange={(e) => {
                      //   updatepostarServico({ ...Servico, nmrResidencia: e.target.value });
                      // }}
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
                      // onChange={(e) => {
                      //   updatepostarServico({ ...Servico, complemento: e.target.value });
                      // }}
                      />
                    </div>
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
              <div className="edit-seguranca">
                <h2>Segurança da conta</h2>
                <p>senha</p>
                <div className="alt-senha">
                  <input type="text" id="senha-alterar" />
                  <p>alterar senha</p>
                </div>
                <div className="sair-excluirBtn">
                  <Link id="sair" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link>
                  <button id="excluir">Excluir</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {showModal && (
        <div className="centralizador-modal-salvar-alteracoes">
          <div className="modal-salvar-alteracoes">
            <p>Seu perfil foi alterado. Deseja salvar as alterações?</p>
            <div className="botoes-modal-salvar-alteracoes">
              <button className="btn-confirmar-alteracoes" onClick={handleSave}>Salvar</button>
              <button className="btn-cancelar-alteracoes" onClick={deleteUpdate.bind(this)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Config;

{
  /* <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link> */
}