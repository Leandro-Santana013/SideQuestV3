import { useContext, useRef, useState } from "react";
import {
  Header,
  SidebarProfissional,
  ImageCropper,
  TextInput,
  
} from "../../components";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./configProfissa.css";
import imgPerfil from "../../assets/icone-perfil.png";

import { ProfessionalContext } from "../../context/ProfissionalContext";
/**/
const configProfissa = () => {
  const { pro } = useContext(ProfessionalContext)
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
    avatarUrl.current.src = pro.img_profissional ? pro.img_profissional : imgPerfil;
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
      <SidebarProfissional />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="cabecalho-editar">
              <img
                id="img"
                htmlFor="comp"
                ref={avatarUrl}
                src={user && user.img_cliente ? user.img_cliente : pro && pro.img_profissional ? pro.img_profissional : imgPerfil }
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
              <button onClick={() => setModalEditar(true)}>Editar</button>
            </div>
            <div className="sessao-config">
              <div className="edit-infoPessoais">
                <h2>Informações Pessoais</h2>
                <h3>Essas informações não estão públicas</h3>
                <div className="input-pessoais">
                  <div className="input-nome-num">
                    <p>Nome</p>
                    {modalEditar ? (
                      <input
                        type="text"
                        id="input-nome"
                        value={(changedUserData && changedUserData.name) || pro.nm_profissional}

                        onChange={(event) => handleFieldChange("name", event)}
                      />
                    ) : (
                      <p>{pro.nm_profissional}</p>
                    )}

                    <p>número</p>
                    {modalEditar ? (
                      <input
                        type="text"
                        id="input-num"
                        value={(changedUserData && changedUserData.numero) || pro.nmr_telefoneProfissional}

                        onChange={(event) => handleFieldChange("numero", event)}
                      />
                    ) : (
                      <p>{pro.nmr_telefoneProfissional}</p>
                    )}
                  </div>
                  <div className="input-email-local">
                    <p>Email</p>
                    {modalEditar ? (
                      <input
                        type="text"
                        id="input-num"
                        value={(changedUserData && changedUserData.email) || pro.cd_emailProfissional
                        }
                        onChange={(event) => handleFieldChange("email", event)}
                      />
                    ) : (
                      <p>{pro.cd_emailProfissional}</p>
                    )}
                    <p>Localização</p>
                    <input type="text" id="input-local" />
                  </div>
                </div>
              </div>
              <div className="edit-perfil">
                <h2>Informações de Perfil</h2>
                <h3>Estas informações para seu perfil público</h3>
                <p>Sobre</p>
                <TextInput />
                <p>Profissão</p>
                <div className="profissoes">
                  <div className="profissao">Eletricista</div>
                  <div className="profissao-add">+</div>
                </div>
              </div>
              <div className="edit-assinatura">
                <h2>Pagamento e assinatura</h2>
                <div className="planos">
                  <p id="plano">Plano irmãos a obra</p>
                  <p id="atualizar">Atualizar</p>
                </div>
                <h2>Detalhes do cartão</h2>
                <div className="cartao">
                  <p>Mastercard - 1111</p>
                </div>
                <div className="add-cartao">
                  <div className="add-cartao-novo">+</div>
                  <p>Adicionar cartão de crédito</p>
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
                <Link id="sair" to="/Login" onClick={() => logoutUser()}>Logout</Link>
                  <button id="excluir">Excluir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Seu perfil foi alterado. Deseja salvar as alterações?</p>
            <button onClick={deleteUpdate.bind(this)}>Cancelar</button>

            <button onClick={handleSave}>Salvar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default configProfissa;

{
  /* <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link> */
}
