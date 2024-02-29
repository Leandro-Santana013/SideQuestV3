import React,{useState} from "react";
import "./homeCliente.css";
import { SidebarCliente, CardProfissional, Header, CustomTextInput } from "../../components";
import imgAproved from "../../assets/aproved.png";
import imgReload from "../../assets/reload.png";
import imgCalendario from "../../assets/calendario1.png";


const HomeCliente = () => {
  const [text, setText] = useState("");
  const handleChange = (newValue) => {
    console.log("Novo valor:", newValue);
    setText(newValue);
  };
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="menu-profissionais">
          <div className="menu-topo">
            <div className="actions">
              <div className="info-action">
                <p>Adicionar serviço</p>
                <div className="action">
                  <p>Publique um serviço e receba orçamentos</p>
                  <img src={imgAproved} alt="" />
                </div>
              </div>
            </div>

            <div className="actions">
              <div className="info-action">
                <p>Serviços Ativos</p>
                <div className="action">
                  <p>Você possui 3 serviços ativos</p>
                  <img src={imgReload} alt="" />
                </div>
              </div>
            </div>

            <div className="actions">
              <div className="info-action">
                <p>Serviços Pendentes</p>
                <div className="action">
                  <p>Vizualize os serviços pendentes</p>
                  <img src={imgCalendario} alt="" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="h1Home">Encontre os melhores profissionais para seu problema</h1>

              <CustomTextInput 
              className="contetn-input"
              onChange={handleChange}
              placeholder={"Encontre profissionais"}
              value={text}
            />
            

          <CardProfissional />  
        </div>
      </div>
    </>
  );
};

export default HomeCliente;
