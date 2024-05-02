import { useContext, useRef, useState } from "react"
import { Header, SidebarCliente, ImageCropper, TextInput } from "../../components"
import "./config.css"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

import imgPerfil from '../../assets/icone-perfil.png'

const Config = () => {
  const avatarUrl = useRef(imgPerfil)
  const [changedUserData, setChangedUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

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


  const deleteUpdate = () =>{
    avatarUrl.current.src = user.img_cliente ? user.img_cliente : imgPerfil
    setChangedUserData(null);
    setShowModal(false)
  }
  
  const { user, logoutUser } = useContext(UserContext)
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="cabecalho-editar">
              <img id="img" htmlFor="comp" ref={avatarUrl} src={user.img_cliente ? user.img_cliente : imgPerfil} alt="Imagem de perfil" className="img-config-perfil" style={{
                border: "1px groove black",
                objectFit: "contain",
                width: "120px",
                height: "120px",
                borderRadius: "50%"
              }} />
              <ImageCropper updatefoto={updatefoto} />
              <button>Editar</button>
            </div>
            <div className="sessao-config">
              <div className="edit-infoPessoais">
                <h2>Informações Pessoais</h2>
                <h3>Essas informações não estão públicas</h3>
                <div className="input-pessoais">
                  <div className="input-nome-num">
                    <p>Nome</p>
                    <input type="text" id="input-nome"/>
                    <p>número</p>
                    <input type="text" id="input-num"/>
                  </div>
                  <div className="input-email-local">
                    <p>Email</p>
                   <input type="text" id="input-email" />
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
                  <div className="profissao">
                    Eletricista
                  </div>
                  <div className="profissao-add">
                    +
                  </div>
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
                <div className="add-cartao-novo">
                    +
                  </div>
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
                  <button id="sair">Sair</button>
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
            <button >Cancelar</button>
            <button>Salvar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Config;

{/* <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link> */ }