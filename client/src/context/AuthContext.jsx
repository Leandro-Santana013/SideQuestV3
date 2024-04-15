import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { postRequest, baseUrl } from "../utils/services";
export const AuthContext = createContext();
import axios from "axios";

export const AuthContextProvider = ({ children }) => {
  //objeto de usuario
  const [user, setUser] = useState({
    name: null,
    email: null,
    nmr: null,
    cpf: null,
    sexo: null,
    idade: null,
  });


  //objeto de registro
  const [formDataCadastro, setFormDataCadastro] = useState({
    name: null,
    email: null,
    cpf: null,
    senha: null,
    senhaConfirm: null,
  });

  //mensagens de erro sucesso e carre gamento
  const [registerError, setRegisterError] = useState(null);
  const [registerSucess, setRegisterSucess] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  //atualiza as informações de registro
  const updateCadastro = useCallback((info) => {
    setFormDataCadastro(info);
  }, []);

   // funcão de registro
   const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await postRequest("/register", formDataCadastro);

        // Se a resposta for uma mensagem de erro
        if (response.error) {
          setRegisterError(response.error); // Define o estado de erro com a mensagem de erro recebida
          setRegisterSucess(null); // Limpa o estado de sucesso
        } else {
          setRegisterSucess(response.message); // Define o estado de sucesso com a mensagem de sucesso recebida
          setRegisterError(null); // Limpa o estado de erro
        }

        setRegisterLoading(false);
      } catch (error) {
        setRegisterError("Erro ao cadastrar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
        setRegisterLoading(false);
      }
    },
    [formDataCadastro, setRegisterError, setRegisterSucess, setRegisterLoading]
  );
  

//login
  const [loginError, setloginError] = useState(null);
  const [loginLoading, setloginLoading] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: null,
    senha: null,
  });

// seta o usuario com o localstorage
  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateLogininfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  

  //logout
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const loginUser = useCallback(async(e) => {
    e.preventDefault();
    setloginLoading(true);
    setloginError(null);
    try {
      const response = await postRequest("/login", loginInfo);

      if (response.error) setloginError(response.error);
      else {
        localStorage.setItem("User", JSON.stringify(response.user));
      }
    } catch (error) {
      setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
    setRegisterLoading(false);}
  }, [loginInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        formDataCadastro,
        updateCadastro,
        registerUser,
        registerError,
        registerSucess,
        registerLoading,
        logoutUser,
        loginUser,
        loginInfo,
        updateLogininfo,
        loginError,
        loginLoading  
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
