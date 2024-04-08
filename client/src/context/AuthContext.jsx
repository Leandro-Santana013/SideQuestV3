import {
  createContext,
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";

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

  const updateCadastro = useCallback((info) => {
    setFormDataCadastro(info);
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        user,
        formDataCadastro,
        updateCadastro,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
