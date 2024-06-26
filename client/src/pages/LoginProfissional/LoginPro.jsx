import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./loginPro.css";
import Cookies from "js-cookie";
import { useIsSignUpActive } from "../../components/HeaderLanding/singUpState";
import { ProfessionalContext } from "../../context/ProfissionalContext";

const LoginProfissional = () => {
  const {
    updateCadastro,
    formDataCadastroPro,
    registerError,
    registerSucess,
    registerLoading,
    registerPro,
    updateLogininfo,
    loginInfo,
    loginPro,
    loginError,
    loginLoading,
  } = useContext(ProfessionalContext);

  var VarisSignUpActive = useIsSignUpActive();
  const [isSignUpActive, setIsSignUpActive] = useState(VarisSignUpActive);
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleCPFChange = (e) => {
    let cpfValue = e.target.value.replace(/\D/g, "");
    cpfValue = cpfValue.slice(0, 11); // Remove todos os caracteres não numéricos
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o primeiro ponto
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
    cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
    setCpf(cpfValue); // Atualiza o estado com o CPF formatado
  };
  return (
    <>
      <div className="container-forms">
        <div
          className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={registerPro}>
              <h1>Criar conta</h1>
              <div className="social-container">
                {registerError && (
                  <div className={`container-mensagem-error`}>
                    {registerError}
                  </div>
                )}
                {registerSucess && (
                  <div className={`container-mensagem-sucess`}>
                    {registerSucess}
                  </div>
                )}
              </div>
              
              <input
                placeholder="Digite seu nome"
                type="text"
                name="name"
                onChange={(e) =>
                  updateCadastro({
                    ...formDataCadastroPro,
                    name: e.target.value,
                  })
                }
              />
              <input
                placeholder="Digite seu email"
                type="email"
                name="email"
                onChange={(e) =>
                  updateCadastro({
                    ...formDataCadastroPro,
                    email: e.target.value,
                  })
                }
              />
              <input
                placeholder="Digite seu CPF"
                type="text"
                id="cpfInput"
                name="cpf"
                value={cpf}
                maxLength={14}
                onChange={(e) => {
                  handleCPFChange(e);
                  updateCadastro({ ...formDataCadastroPro, cpf: e.target.value });
                }}
              />
              <input
                placeholder="Digite uma senha"
                type="password"
                name="senha"
                onChange={(e) =>
                  updateCadastro({
                    ...formDataCadastroPro,
                    senha: e.target.value,
                  })
                }
              />
              <input
                placeholder="Confirme sua senha"
                type="password"
                name="senhaConfirm"
                onChange={(e) =>
                  updateCadastro({
                    ...formDataCadastroPro,
                    senhaConfirm: e.target.value,
                  })
                }
              />
              <button type="submit">Cadastrar</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={loginPro}>
              <h1>Login</h1>
              <div className="social-container"></div>
              {loginError && (
                  <div className={`container-mensagem-error`}>{loginError}</div>
                )}
              <input
                placeholder="Digite seu email"
                type="email"
                name="email"
                onChange={(e) => {
                  updateLogininfo({ ...loginInfo, email: e.target.value });
                }}
              />
              <input
                placeholder="Digite sua senha"
                type="password"
                name="senha"
                onChange={(e) => {
                  updateLogininfo({ ...loginInfo, senha: e.target.value });
                }}
              />
              <a className="forgot" href="#">
                Esqueceu a sua senha?
              </a>
              <button type="submit">Entrar</button>
            </form>
          </div>
          <div className="painel-container">
            <div className="painel">
              <div className="painel-panel painel-left">
                <h1>Bem vindo à SideQuest</h1>
                <p>Se você já possui uma conta, realize o seu login.</p>
                <button className="ghost" onClick={handleSignInClick}>
                  Entrar
                </button>
              </div>
              <div className="painel-panel painel-right">
                <h2>Você ainda não possui uma conta?</h2>
                <p></p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Cadastre-se!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginProfissional;
