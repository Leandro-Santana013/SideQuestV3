import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./homeCliente.css";
import { SidebarCliente, CardProfissional, Header, Infoinc, MenuBottomCliente } from "../../components";
import imgAproved from "../../assets/aproved.png";
import imgReload from "../../assets/reload.png";
import imgCalendario from "../../assets/calendario1.png";
import { postRequest, favRequest, baseUrl, getRequest, putRequest, } from "../../utils/services";
import { RiFilter2Fill } from "react-icons/ri";
import { UserContext } from '../../context/UserContext';

const HomeCliente = () => {
  const { user } = useContext(UserContext);
  const [n, setN] = useState(0);

  useEffect(() => {
    const getFavs = async () => {
      if (user && user.id_cliente) {
        try {
          const response = await getRequest(`/user/nservice/${user.id_cliente}`);
          setN(response)
          console.log(response,"n serviços")
       
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFavs();
  }, [user]);

  return (
    <>
      <Infoinc />
      <Header />
      <SidebarCliente />
      <MenuBottomCliente />

      <div className="content-midia">
        <div className="main-content">
          <div className="menu-topo">
            <div className="actions">
              <div className="info-action">
                <p>Adicionar Serviço</p>
                <Link to="/homeCliente/postarSevico">
                  <div className="action">
                    <p>Publique um serviço e receba orçamentos</p>
                    <img src={imgAproved} alt="" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="actions">
              <div className="info-action">
                <p>Serviços Ativos</p>
                <Link to="/ServicosAtivosCliente">
                <div className="action">
                  <p>Você possui {n ? n : "0"} serviços ativos</p>
                  <img src={imgReload} alt="" />
                </div>
                </Link>
              </div>
            </div>

            <div className="actions">
              <div className="info-action">
                <p>Serviços Pendentes</p>
                <Link to="/servicosPendentesCliente">
                <div className="action">
                  <p>Visualize os serviços pendentes</p>
                  <img src={imgCalendario} alt="" />
                </div>
                </Link>
              </div>
            </div>
          </div>

          <h1 className="h1Home">Encontre os melhores profissionais para seu problema</h1>
          <CardProfissional />  
        </div>
      </div>
    </>
  );
};

export default HomeCliente;
