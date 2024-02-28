import React from "react";
import { useState } from "react";
import {  
  CarrosselSwiper,
  Benefits,
  Animation,
  Navhome,
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
    <div className="homeContainer">
      <Navhome />

      <div class="banner">
        <div class="left-banner">
          <div class="text-input">
            <h1 className="h1Banner">
              Encontre os melhores <strong>profissionais</strong> para <br />
              sua <strong>residência</strong> aqui!
            </h1>
            <CustomTextInput
              onChange={handleChange}
              placeholder={"Busque por serviços"}
              value={text}
            />
          </div>
          <img class="img-banner" src={ftbanner} alt="furadeira" />
        </div>
      </div>
      <CarrosselSwiper />
      <Benefits />
      <Animation />
      <Footer />
    </div>
  );
};

export default Home;
