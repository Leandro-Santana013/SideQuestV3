import React from "react";
import { useState } from "react";
import {
  CarrosselSwiper,
  Benefits,
  Animation,
  HeaderLanding,
  Footer,
} from "../../components";
import "./landing.css";
import ftbanner from "../../assets/ftbanner.png";

import { CustomTextInput } from "../../components/TextInput/TextInput";
import { Typography } from "../../components/Typography/Typography";

const Home = () => {
  const [text, setText] = useState("");
  const handleChange = (newValue) => {
    console.log("Novo valor:", newValue);
    setText(newValue);
  };
  return (
    <>
      <HeaderLanding/>

      <div className="banner">
        <div className="left-banner">
          <div className="text-input">
            <h1 className="h1Landing">
              Encontre os melhores <strong>profissionais</strong> para <br />
              sua <strong>residência</strong> aqui!
            </h1>
            <CustomTextInput
              onChange={handleChange}
              placeholder={"Busque por serviços"}
              value={text}
            />
          </div>
          <img className="img-banner" src={ftbanner} alt="furadeira" />
        </div>
      </div>
      <CarrosselSwiper />
      <Benefits />
      <Animation />
      <Footer />
    </>
  );
};

export default Home;
