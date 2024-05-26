import { Header, SidebarCliente } from "../../components"
import imgPerfil from "../../assets/icone-perfil.png"
import "./perfilCliente.css"

const PerfilCliente = () => {
  return (
    <div>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="perfilbox">
          <div className="header-perfil">
            <div className="perfil-client">
              <img className="img-perfil" src={imgPerfil}/>
              <h2>Nome</h2>
            </div>
            <button>
              <h3>editar</h3>
            </button>
          </div>
          <hr />
          <div className="details">

            <h3>Detalhes</h3>
            <div className="name">
              <div className="char">
                <p>nome</p>
                <div className="name-content">
                  <p>Default</p>
                </div>
              </div>
            </div>

            <div className="contact">

              <div className="char">
                <p>email</p>
                <div className="contact-content">
                  <p></p>
                </div>
              </div>

              <div className="char">
                <p>Endereço</p>
                <div className="contact-content">
                  <p></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente;
