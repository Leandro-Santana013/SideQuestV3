import {
  createContext,
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";
import { postRequest, baseUrl } from "../utils/services";
export const AuthContext = createContext();
import axios from "axios";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    email: null,
    nmr: null,
    cpf: null,
    sexo: null,
    idade: null,
  });

  const [formDataCadastro, setFormDataCadastro] = useState({
    name: null,
    email: null,
    cpf: null,
    senha: null,
    senhaConfirm: null,
  }); 
  console.log(formDataCadastro)
  const [registerError, setRegisterError] = useState(null);
  const [registerSucess, setRegisterSucess] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  
  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError(null);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formDataCadastro
      );
      // Registrou com sucesso
      console.log(response.data);
      setRegisterSucess(response.data.message);
      // ... (redirecionar para outra página, etc.)
      setRegisterLoading(false);
    } catch (error) {
      // Erro na requisição
      setRegisterLoading(false);
      if (error.response && error.response.status === 400) {
        setRegisterError(error.response.data.error);
      } else {
        // Tratar outros tipos de erros
        console.error(error);
      }
    }
  }, [formDataCadastro]);
  
  const updateCadastro = useCallback((info) => {
    setFormDataCadastro(info);
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
