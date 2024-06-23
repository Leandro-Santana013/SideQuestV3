import { useContext, useEffect, useRef, useState } from "react";
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
import { IoIosWarning } from "react-icons/io";

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
    setmudandoloc,
    comparePassword,
    setpass,
    passSucess,
    passErrorCompare,
    levelSecPass,
    alterpass,
    setpassSucess,
    setpassErrorCompare,
    setLevelSecPass,
    setAlterPass,
    num,
    deleteuser,
  } = useContext(UserContext);

  const handleCepChange = async (e) => {
    const cep = e.target.value;
    if (cep.length === 8) {
      await fetchData(cep, true);
    }
  };

  useEffect(() => {
    
    if (mudandoloc) {
      setChangedUserData((prevData) => ({
        ...prevData,
        cd_cep: mudandoloc?.cep,
        uf_localidade: mudandoloc?.uf_localidade,
        nm_bairro: mudandoloc?.bairro,
        nm_logradouro: mudandoloc?.logradouro,
        nmr_casa: mudandoloc?.nmr_casa,
        complemento: mudandoloc?.complemento,
      }));
    }
  }, [cepConfig, mudandoloc]);

  const updateUserData = async (newData) => {
    const changes = {};
    changes.id_cliente = user.id_cliente;
    if (newData.name !== user.name) changes.name = newData.name;
    if (newData.email !== user.email) changes.email = newData.email;
    if (newData.numero !== user.numero) changes.numero = newData.numero;
    if (newData.foto !== imgPerfil && newData.foto !== user.foto) changes.foto = newData.foto;
    if (newData.cd_cep !== locationuser?.cd_cep && newData.cd_cep !== null) changes.cd_cep = newData.cd_cep;
    if (newData.uf_localidade !== locationuser?.uf_localidade ) changes.uf_localidade = newData.uf_localidade;
    if (newData.nm_bairro !== locationuser?.nm_bairro) changes.nm_bairro = newData.nm_bairro;
    if (newData.nm_logradouro !== locationuser?.nm_logradouro) changes.nm_logradouro = newData.nm_logradouro;
    if (newData.nmr_casa !== locationuser?.nmr_casa) changes.nmr_casa = newData.nmr_casa;
    if (newData.complemento !== locationuser?.complemento) changes.complemento = newData.complemento;

    setChangedUserData(changes);
    if (Object.keys(changes).length > 0) {
      if (changes.cd_cep) {
        if (changes.cd_cep.length === 8) {
          if (!cepConfig) {
            setShowModal(true);
          }
        }
      } else if (changes.cd_cep !== undefined) {
        return;
      } else {
        setShowModal(true);
      }
    }
    setChangedUserData(changes);
  };
  useEffect(()=>{
console.log(changedUserData)
  }, [changedUserData])


  const updatefoto = (ImgSrc) => {
    avatarUrl.current.src = ImgSrc;
    updateUserData({ ...changedUserData, foto: ImgSrc });
  };

  const handleFieldChange = (field, event) => {
    const newValue = event.target.value;

    if (field == "password") {
      setpass((senha) => ({
        ...senha,
        [field]: newValue,
      }));
      return;
    }
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
    setparabens(false);
    setmudandoloc(null);
    setloc(null)
  };

  const [parabens, setparabens] = useState(null);

  const [modalEditar, setModalEditar] = useState(false);
  const [certeza, setCerteza] = useState(null);

  const handleSave = () => {
    if (cepConfig) {
      setparabens(true);
      return;
    }
    functionUpdateInfoUser();
    setModalEditar(false);
  };

  const [modal, setmodal] = useState(null);
  const [loc, setloc] = useState(null);
  const setlock = () => {
    setloc(true);
 
  };

  return (
    <>
      <Header />
      <SidebarCliente />
      <MenuBottomCliente />
      <div className="content-midia">
        <div className="main-content">
          <>
            {parabens && (
              <>
                <h1>Digite seu CEP corretamente!</h1>
              </>
            )}
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
              <p>{user.nm_cliente}</p>
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
                          (changedUserData?.name !== undefined
                            ? changedUserData.name
                            : user.nm_cliente) || null
                        }
                        onChange={(event) => handleFieldChange("name", event)}
                      />
                    ) : (
                      <span>{user.nm_cliente}</span>
                    )}

                    {user && user.nmr_telefoneCliente && (
                      <>
                        <p>Número</p>
                        {modalEditar ? (
                          <input
                            type="text"
                            id="input-num"
                            value={
                              (changedUserData?.numero !== undefined
                                ? changedUserData.numero
                                : user.nmr_telefoneCliente) || null
                            }
                            onChange={(event) =>
                              handleFieldChange("numero", event)
                            }
                          />
                        ) : (
                          <span>{user.nmr_telefoneCliente}</span>
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
                          (changedUserData?.email !== undefined
                            ? changedUserData.email
                            : user.cd_emailCliente) || null
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
                  <h2>Endereço Principal</h2>
                  {locationuser || loc ? (
                    <>
                      <div className="cep-estado">
                        <div>
                          <h4 className="postarH4">CEP</h4>
                          <div>
                            <TextInput
                              className="componente-content-input-config-cep"
                              type="text"
                              name="cep"
                              value={
                                (changedUserData?.cd_cep !== undefined
                                  ? changedUserData.cd_cep
                                  : locationuser?.cd_cep) || null
                              }
                              size={{ 
                                border: cepConfig
                                  ? "2px solid red"
                                  : "2px solid #eee",
                              }}
                              onChange={async (event) => {
                                const newCep = event.target.value;

                                handleFieldChange("cd_cep", {
                                  target: { value: newCep },
                                });

                                try {
                                  await handleCepChange(event);
                                } catch (error) {
                                  console.log(error);
                                }
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
                            value={
                              mudandoloc?.uf_localidade ||
                              locationuser?.uf_localidade
                            }
                            onChange={(event) =>
                              handleFieldChange("uf_localidade", event)
                            }
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
                            autoComplete="address-level3"
                            placeholder={""}
                            value={
                              (changedUserData?.nm_bairro !== undefined
                                ? changedUserData.nm_bairro
                                : mudandoloc?.bairro
                                  ? mudandoloc?.bairro
                                  : locationuser?.nm_bairro) || null
                            }
                            onChange={(event) =>
                              handleFieldChange("nm_bairro", event)
                            }
                          />
                        </div>
                        <div>
                          <div>
                            <h4 className="postarH4">Nome da rua</h4>
                            <TextInput
                              className="componente-content-input-config-rua"
                              type="text"
                              name="nmRua"
                              autoComplete="address-level2"
                              placeholder={"nm_logradouro"}
                              value={
                                (changedUserData?.nm_logradouro !== undefined
                                  ? changedUserData.nm_logradouro
                                  : mudandoloc?.logradouro
                                    ? mudandoloc?.logradouro
                                    : locationuser?.nm_logradouro) || null
                              }
                              onChange={(event) =>
                                handleFieldChange("nm_logradouro", event)
                              }
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
                            autoComplete="address-line1"
                            placeholder={""}
                            value={
                              (changedUserData?.nmr_casa !== undefined
                                ? changedUserData.nmr_casa
                                : locationuser?.nmr_casa) || null
                            }
                            onChange={(event) =>
                              handleFieldChange("nmr_casa", event)
                            }
                          />
                        </div>
                        <div>
                          <h4 className="postarH4">Complemento</h4>
                          <TextInput
                            className="componente-content-input-config-complemento"
                            type="text"
                            name="complemento"
                            autoComplete="address-line"
                            value={
                              (changedUserData?.complemento !== undefined
                                ? changedUserData.complemento
                                : locationuser?.txt_complemento) || null
                            }
                            placeholder={""}
                            onChange={(event) =>
                              handleFieldChange("complemento", event)
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) :
                    (<div>
                      <p>Nenhuma localização vinculada</p>
                      <button onClick={setlock}>Insira localização principal</button>
                    </div>
                    )}
                </div>
              </div>
              <div className="edit-seguranca">
                <h2>Segurança da conta</h2>
                {!modal && (
                  <button className="btn-alterar-senha"
                    onClick={() => {
                      setmodal(true);
                    }}
                  >
                    Alterar senha
                  </button>
                )}
                {modal && (
                  <>
                    {!passSucess ? (
                      <>
                        <div className="alt-senha">
                          <p>Digite sua senha atual:</p>
                          <input
                            type="password"
                            id="senha-alterar"
                            onChange={(event) => {
                              handleFieldChange("password", event);
                            }}
                          />
                          <div style={{ height: '15px' }}>
                            {passErrorCompare && <p style={{ color: 'red', fontWeight: 'normal', margin: '0', padding: '0' }}>Senha Incorreta</p>}
                          </div>

                          <div className="enviar-cancelar-alt-senha">
                            <button className="btn-enviar-senha"
                              onClick={() => {
                                comparePassword();
                              }}
                            >
                              Enviar
                            </button>

                            <button className="btn-cancelar-senha"
                              onClick={() => {
                                setmodal(null);
                                setpassSucess(null);
                                setpassErrorCompare(null);
                                setLevelSecPass(null);
                                setAlterPass(null);
                              }}
                            >
                              {alterpass ? "fechar" : "Cancelar"}
                            </button>

                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2>Digite sua nova senha:</h2>
                        <input
                          type="password"
                          id="senha-alterar"
                          onChange={(event) => {
                            handleFieldChange("password", event);
                          }}
                        />
                        <button className="btn-salvar-nova-senha"
                          onClick={() => {
                            comparePassword(true);
                          }}
                        >
                          Salvar Nova Senha
                        </button>
                        <div style={{ height: '20px' }}>
                          {levelSecPass && !alterpass ? (
                            <p style={{ margin: '0', fontWeight: 'normal', color: 'red' }}>{levelSecPass}</p>
                          ) : (
                            <>
                              <p>{alterpass}</p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="sair-excluirBtn">
                  <Link id="sair" to="/Login" onClick={() => logoutUser()}>
                    Sair
                  </Link>
                  <button id="excluir" onClick={() => {
                    setCerteza(true)
                  }}>Excluir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {certeza && (
          <div className="content-modal-confirmar-excluir-conta">
            <div className="modal-confirmar-excluir-conta">
              <IoIosWarning />
              <h2>Todos os seus dados serão excluidos
                e nunca mais poderão ser acessados, {num > 0 ? `você possui ${num} serviços ativos` : ""}
                tem certeza que deseja deletar sua conta?
              </h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-sim" onClick={async () => { await deleteuser(); logoutUser() }}>Confirmar</button>
                <button className="btn-nao" onClick={() => { setCerteza(null) }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
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
