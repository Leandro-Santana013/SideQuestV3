import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_SideQuest.png";
import "./PasswordRec.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";

const PasswordRec = () => {
  const navigate = useNavigate()
  const {
    calbackpassword,
    setObjectPass,
    errorpass,
    errorpassMessage,
    typemodal,
    setTypemodal,
    seterrorpass,
    seterrorpassMessage
  } = useContext(UserContext);

  useEffect(() => {
    if (typemodal == 4) {
      navigate("/login")
      setTypemodal(1)
      setObjectPass(null)
      seterrorpass(null)
      seterrorpassMessage(null)
    }
  }, [typemodal])

  const [showPasswordStrength, setShowPasswordStrength] = useState(false)
  const [password, setPassword] = useState("");
  const handlePasswordFocus = () => {
    setShowPasswordStrength(true);
  };

  const handlePasswordBlur = () => {
    setShowPasswordStrength(false);
  };


  const handleChange = (field, event) => {
    const novoValor = event.target.value;
    setObjectPass((prevFormData) => ({
      ...prevFormData,
      [field]: novoValor
    }));
  };

  return (
    <>


      <div className="container-forms-password">
        <div className="form-container">
          <img className="img-logo" src={logo} alt="" />
          {typemodal == 1 && (
            <>
              <h3>Recuperar sua conta</h3>
              <p>Podemos ajudá-lo a redefinir sua senha e informações de segurança. Primeiro, insira sua conta da SideQuest e siga as instruções a seguir.</p>
              <form onSubmit={calbackpassword}>
                {errorpass &&
                  <p className="erro">{errorpassMessage}</p>
                }
                <input
                  className="input-email"
                  placeholder="Digite seu email"
                  type="email"
                  name="email"
                  onChange={(event) => { handleChange("email", event) }}
                />
                <div className="alignToBack">
                  <Link to={"/login"} onClick={(e) => { setTypemodal(1); setObjectPass(null); seterrorpass(null); seterrorpassMessage(null);}} className="cancelar">Cancelar</Link>
                  <button type="submit" className="avancar">Avançar</button>
                </div>
              </form>

            </>
          )}
          {typemodal == 2 && (
            <>
              <h3>Verificar sua identidade</h3>
              <p>Se seu email corresponder ao endereço de email em sua conta, enviaremos um código para você.</p>
              <form onSubmit={calbackpassword}>
                {errorpass &&
                  <p className="erro">{errorpassMessage}</p>
                }
                <input
                  className="input-email"
                  placeholder="Digite seu codigo"
                  type=""
                  name=""
                  onChange={(event) => { handleChange("tokenpass", event)}}
                />
                <div className="alignToBack">
                  <Link to={"/login"} onClick={(e) => {
                    setTypemodal(1); setObjectPass(null); seterrorpass(null); errorpassMessage(null); seterrorpass(null); seterrorpassMessage(null);}} className="cancelar">Cancelar</Link>
                  <button type="submit" className="avancar">Avançar</button>
                </div>
              </form>
            </>
          )}
          {typemodal == 3 && (
            <>
              <h3>ultima etapa</h3>
              <p>insira sua senha e sua senha de confirmação.</p>
              <form onSubmit={calbackpassword}>
                {errorpass &&
                  <p className="erro">{errorpassMessage}</p>
                }
                <input
                  className="input-senha"
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  name="password"
                  onChange={(event) => { setPassword(event.target.value); handleChange("newpassword", event) }}
                />
                {showPasswordStrength && (
                  <div className="modal-password" >
                    <PasswordStrength password={password} />
                  </div>
                )}
                <input
                  className="input-senha"
                  placeholder="Confirme sua senha"
                  type="password"
                  name="password"
                  onChange={(event) => { handleChange("newpasswordconfirm", event) }}
                />
                <div className="alignToBack">
                  <Link to={"/login"} onClick={(e) => { setTypemodal(1); setObjectPass(null); seterrorpass(null); seterrorpassMessage(null);}} className="cancelar">Cancelar</Link>
                  <button type="submit" className="avancar">Avançar</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>


    </>
  );
};

export default PasswordRec;
