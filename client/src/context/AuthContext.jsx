import {
  createContext,
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";
import { postRequest, baseUrl } from "../utils/services";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState({
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
  
  const registerUser = useCallback(async(e) =>{
    e.preventDefault();
    setRegisterLoading(true)
    setRegisterError(null)
    const response = await postRequest(`/register`, JSON.stringify(formDataCadastro));
    setRegisterLoading(false)
    if(response.error){
      return setRegisterError(response);
    }
    else if(response.message) {
      return setRegisterSucess(response.message)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setuser(response);
  }, [])
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
        registerSucess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
