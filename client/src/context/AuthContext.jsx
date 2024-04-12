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
        const req = await postRequest('/register', formDataCadastro);

        // Se a resposta for uma mensagem de erro
        if (req.error) {
            setRegisterError(req.error); // Define o estado de erro com a mensagem de erro recebida
            setRegisterSucess(null); // Limpa o estado de sucesso
        } else {
          setRegisterSucess(req); // Define o estado de sucesso com a mensagem de sucesso recebida
            setRegisterError(null); // Limpa o estado de erro
        }
        setFormDataCadastro({}); // Limpa os dados do formulário após o registro bem-sucedido
        setRegisterLoading(false);
    } catch (error) {
        setRegisterError("Erro ao cadastrar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
        setRegisterLoading(false);
    }
}, [formDataCadastro, setRegisterError, setRegisterSucess, setRegisterLoading]);

  
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
