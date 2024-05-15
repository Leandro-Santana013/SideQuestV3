import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/services.ts";
import "./login.css";

import { Loading } from "../../components";
import { handleCPFChange } from "../../utils/helpfunctions.ts";

export const Login = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucessOrErrorStatus, setSucessOrErrorStatus] = useState<
    "sucess" | "error" | ""
  >("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setPassword] = useState("");
  const [senhaConfirm, setSamePassword] = useState("");
  const [locationuser, setlocationuser] = useState(null);

  const formDataLogin = {
    email,
    senha,
  };

  const registerUser = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setMessageStatus("");
      setSucessOrErrorStatus("");
      const formDataCadastro = {
        name,
        email,
        cpf,
        senha,
        senhaConfirm,
      };
      try {
        const response = await postRequest("/user/register", formDataCadastro);
        if (response.error) {
          console.log("Aquiiiiii2222", response);
          setSucessOrErrorStatus("error");
          setMessageStatus(response.error); // Define o estado de erro com a mensagem de erro recebida
        } else {
          setSucessOrErrorStatus("sucess");
          setMessageStatus(response.message); // Define o estado de sucesso com a mensagem de sucesso recebida
        }
      } catch (error) {
        console.log("Aquiiiiii", error);
        setSucessOrErrorStatus("error");
        setMessageStatus("Erro ao cadastrar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
      } finally {
        setLoading(false);
      }
    },
    [loading, messageStatus, setMessageStatus]
  );

  const loginUser = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setMessageStatus("");
      setSucessOrErrorStatus("");
      try {
        const response = await postRequest("/user/login", formDataLogin);

        if (response.error) {
          setSucessOrErrorStatus("error");
          setMessageStatus(response.error);
        } else {
          const pro = localStorage.getItem("pro");
          if (pro) {
            localStorage.removeItem("pro");
            setSucessOrErrorStatus("sucess");
            setMessageStatus(response.user.localizacaoprincipal);
            localStorage.setItem(
              "User",
              JSON.stringify(response.user.clienteuser)
            );
            window.location.reload;
          } else {
            localStorage.setItem(
              "User",
              JSON.stringify(response.user.clienteuser)
            );
            setlocationuser(response.user.localizacaoprincipal);
            window.location.reload();
          }
        }
      } catch (error) {
        setSucessOrErrorStatus("error");
        setMessageStatus("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
      } finally {
        setLoading(false);
      }
    },
    [formDataLogin, setMessageStatus, setlocationuser]
  );

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  return (
    <>
      <div className="container-forms">
        <div
          className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={(e) => registerUser(e)}>
              <h1>Criar conta</h1>
              <div className="social-container"></div>
              {sucessOrErrorStatus === "error" && (
                <div className={`container-mensagem-error`}>
                  {messageStatus}
                </div>
              )}
              {sucessOrErrorStatus === "sucess" && (
                <div className={`container-mensagem-sucess`}>
                  {messageStatus}
                </div>
              )}

              <input
                placeholder="Digite seu nome"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Digite seu email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Digite seu CPF"
                type="text"
                id="cpfInput"
                name="cpf"
                value={cpf}
                maxLength={14}
                onChange={(e) => {
                  setCpf(e.target.value);
                }}
              />
              <input
                placeholder="Digite uma senha"
                type="password"
                name="senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="Confirme sua senha"
                type="password"
                name="senhaConfirm"
                onChange={(e) => setSamePassword(e.target.value)}
              />
              <button type="submit" className="btn-cadastrar">
                {loading ? <Loading /> : "Cadastrar"}
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={(e) => loginUser(e)}>
              <h1>Login</h1>

              <div className="social-container">
                {sucessOrErrorStatus === "error" && (
                  <div className={`container-mensagem-error`}>
                    {messageStatus}
                  </div>
                )}
              </div>

              <input
                placeholder="Digite seu email"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                placeholder="Digite sua senha"
                type="password"
                name="senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit">Entrar</button>
            </form>
          </div>
          <div className="painel-container">
            <div className="painel">
              <div className="painel-panel painel-left">
                <h1>Bem-vindo à SideQuest</h1>
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
