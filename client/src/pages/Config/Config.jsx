  import { useContext, useEffect, useRef, useState,useCallback } from "react";
 
  import {
    Header,
    SidebarCliente,
    ImageCropper,
    TextInput,
    MenuBottomCliente,
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
      locationuser,
      fetchData,
      cepConfig,
      setCepConfig,
      mudandoloc,
      setmudandoloc
    } = useContext(UserContext);

    const handleCepChange = async (e) => {
      const cep = e.target.value;
      const cepToFetch = cep; // Armazena o valor atual do CEP em uma variável local
      if (cep.length === 8) await fetchData(cepToFetch, true); // Chama a função de busca de dados do CEP com o valor atual
    };

    

const updateUserData = useCallback(async (newData) => {
  const changes = {};
  changes.id_cliente = user.id_cliente;
  if (newData.name !== user.name) changes.name = newData.name;
  if (newData.email !== user.email) changes.email = newData.email;
  if (newData.numero !== user.numero) changes.numero = newData.numero;
  if (newData.foto !== imgPerfil && newData.foto !== user.foto) changes.foto = newData.foto;
  if (newData.cd_cep !== locationuser.cd_cep && newData.cep !== null) changes.cd_cep = newData.cd_cep;
  if (newData.uf_localidade !== locationuser.uf_localidade) changes.uf_localidade = newData.uf_localidade;
  if (newData.nm_bairro !== locationuser.nm_bairro) changes.nm_bairro = newData.nm_bairro;
  if (newData.nm_logradouro !== locationuser.nm_logradouro) changes.nm_logradouro = newData.nm_logradouro;
  if (newData.nmr_casa !== locationuser.nmr_casa) changes.nmr_casa = newData.nmr_casa;
  if (newData.complemento !== locationuser.complemento) changes.complemento = newData.complemento;
  setChangedUserData(changes);
  if (Object.keys(changes).length > 0) {
    if (changes.cd_cep !== locationuser.cd_cep && changes.cd_cep) {
      if (changes.cd_cep.length === 8){
        if (changes.cd_cep !== locationuser.cd_cep && !cepConfig) {
          console.log(user);
          setShowModal(true);
        }
      }
    } else setShowModal(true);
  }
  setChangedUserData(changes);
}, [user, imgPerfil, locationuser, setChangedUserData, setShowModal, cepConfig]);


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
      setCepConfig(false);
      setparabens(false)
      setmudandoloc(null)
    };
    const [parabens, setparabens] = useState(null);
    useEffect(() => {
      console.log(cepConfig, "estado do cep");
    }, [cepConfig]);
    /***************************************************/

    const [modalEditar, setModalEditar] = useState(false);
  
    const handleSave = () => {
      if(cepConfig){
        setparabens(true)
        return;
      }
      functionUpdateInfoUser();
      setModalEditar(false); // Define o estado modalEditar de volta para false
    };
    /***************************************************/

    return (
      <>
        <Header />
        <SidebarCliente />
        <MenuBottomCliente />
        <div className="content-midia">
          <div className="main-content">
            <>
            {parabens && (<>
            
            <h1>Salva direito animal</h1>
          
            
            
            
            </>)}
            </>
            
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
                          value={
                            (changedUserData && changedUserData.name) ||
                            user.nm_cliente
                          }
                          onChange={(event) => handleFieldChange("name", event)}
                        />
                      ) : (
                        <span>{user.nm_cliente}</span>
                      )}

                      {user && user.nmr_telefoneCliente && (
                        <>
                          <p>número</p>
                          {modalEditar ? (
                            <input
                              type="text"
                              id="input-num"
                              value={
                                (changedUserData && changedUserData.numero) ||
                                user.nmr_telefoneCliente
                              }
                              onChange={(event) =>
                                handleFieldChange("numero", event)
                              }
                            />
                          ) : (
                            <p>{user.nmr_telefoneCliente}</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="input-email-local">
                      <p>Email</p>
                      {modalEditar ? (
                        <input
                          type="text"
                          id="input-num"
                          value={
                            (changedUserData && changedUserData.email) ||
                            user.cd_emailCliente
                          }
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
                            className="componente-content-input-config-cep"
                            type="text"
                            name="cep"
                            value={
                              (changedUserData?.cd_cep !== undefined ? changedUserData.cd_cep : locationuser?.cd_cep) || null
                            }
                            size={{
                              border: cepConfig
                                ? "2px solid red"
                                : "2px solid #eee",
                            }}
                            onChange={async (event) => {
                              const newCep = event.target.value;
                              try {
                                await handleCepChange(event);
                                handleFieldChange("cd_cep", {
                                  target: { value: newCep },
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            
                              // Chama a função handleCepChange existente
                              // updatepostarServico({ ...Servico, cep: e.target.value }); // Atualiza o estado do serviço com o novo valor do CEP
                            }}
                          />
                          {cepConfig && <p className="cepError">CEP incorreto</p>}
                        </div>
                      </div>
                      <div>
                        <h4 className="postarH4">Estado - Cidade</h4>
                        <TextInput
                          className="componente-content-input-config-cidade"
                          type="text"
                          name="estado_cidade"
                          placeholder={""}
                          value={ mudandoloc?.uf_localidade || locationuser?.uf_localidade}
                          onChange={(event) => handleFieldChange("uf_localidade", event)}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="bairro-rua">
                      <div>
                        <h4 className="postarH4">Bairro</h4>
                        <TextInput
                          className="componente-content-input-config-bairro"
                          type="text"
                          name="bairro"
                          autocomplete="off"
                          placeholder={""}
                          value={(changedUserData?.nm_bairro !== undefined ? changedUserData.nm_bairro : mudandoloc?.bairro ? mudandoloc?.bairro : locationuser?.nm_bairro) || null}
                          onChange={(event) => handleFieldChange("nm_bairro", event)}
                        />
                      </div>
                      <div>
                        <div>
                          <h4 className="postarH4">Nome da rua</h4>
                          <TextInput
                            className="componente-content-input-config-rua"
                            type="text"
                            name="nmRua"
                            autocomplete="off"
                            placeholder={"nm_logradouro"}
                            value={(changedUserData?.nm_logradouro !== undefined ? changedUserData.nm_logradouro : mudandoloc?.logradouro ? mudandoloc?.logradouro : locationuser?.nm_logradouro) || null}
                            onChange={(event) => handleFieldChange("nm_logradouro", event)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="num-complemento">
                      <div>
                        <h4 className="postarH4">Número da residência</h4>

                        <TextInput
                          className="componente-content-input-config-residencia"
                          type="number"
                          name="nmrResidencia"
                          autocomplete="off"
                          placeholder={""}
                          value={(changedUserData?.nmr_casa !== undefined ? changedUserData.nmr_casa: locationuser?.nmr_casa) || null}
                          onChange={(event) => handleFieldChange("nmr_casa", event)}
                        />
                      </div>
                      <div>
                        <h4 className="postarH4">Complemento</h4>
                        <TextInput
                          className="componente-content-input-config-complemento"
                          type="text"
                          name="complemento"
                          autocomplete="off"
                          value={(changedUserData?.complemento !== undefined ? changedUserData.complemento: locationuser?.complemento ) || null}
                          placeholder={""}
                          onChange={(event) => handleFieldChange("complemento", event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="edit-seguranca">
                  <h2>Segurança da conta</h2>
                  <p>senha</p>
                  <div className="alt-senha">
                    <input type="text" id="senha-alterar" />
                    <p>alterar senha</p>
                  </div>
                  <div className="sair-excluirBtn">
                    <Link id="sair" to="/Login" onClick={() => logoutUser()}>
                      LOGOUT
                    </Link>
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
                <button className="btn-confirmar-alteracoes" onClick={handleSave}>
                  Salvar
                </button>
                <button
                  className="btn-cancelar-alteracoes"
                  onClick={deleteUpdate.bind(this)}
                >
                  Cancelar
                </button>
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
