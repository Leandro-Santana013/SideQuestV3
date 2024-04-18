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
    id: null,
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

    setServico((prevServico) => ({
      ...prevServico,
      idCliente: user ? user.id : null,
    }));
  }, []);

  const updateLogininfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  //logout
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    window.location.reload();
  }, []);

  const loginUser = useCallback(async(e) => {
    e.preventDefault();
    setloginLoading(true);
    setloginError(null);
    try {
      const response = await postRequest("/login", loginInfo);

      if (response.error) setloginError(response.error);
      else {
        console.log(response.user)
        localStorage.setItem("User", JSON.stringify(response.user));
        window.location.reload();
      }
    } catch (error) {
      setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
    setRegisterLoading(false);}
  }, [loginInfo]);


  const [cepError, setCepError] = useState(false);
  const [categorias, setCategorias] = useState([])
  


  const [Servico, setServico] = useState({
    titulo: null,
    dsServico: null,
    cep: null,
    uf_localidade: null,
    logradouro: null,
    bairro: null,
    nmrResidencia: null,
    categoriaSelecionada: null,
    complemento: null,
    idCliente: null,
    email: null,
    imagens: null,
  });

  const [endereco, setEndereco] = useState({
    cep: null,
    uf_localidade: null,
    logradouro: null,
    bairro: null,
  });


  
  const PostarServico = useCallback(async(e) => {
    e.preventDefault();
    console.log(Servico)
    await zipImages();
  
    try {
      // Enviar o formulário com o estado formData atualizado
      const response = await axios.post(
        "http://localhost:5000/auth/postarServico",
        Servico
      );
  
      setMessage(response.data.message);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMessage(
        error.response?.data?.message || "Erro ao cadastrar. Tente novamente."
      );
    }
  }, []);

  const fetchData = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        const { uf, localidade, logradouro, bairro } = response.data;
        updatepostarServico({
          ...Servico,
          cep,
          uf_localidade: `${uf} - ${localidade}`,
          logradouro,
          bairro
        });
        setEndereco({
          ...endereco,
          cep,
          uf_localidade: `${uf} - ${localidade}`,
          logradouro,
          bairro
        });
        console.log(endereco);

      } else {
        setCepError(true)
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };
  


  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/selectCategoria"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
     
    };

    // Chama a função para buscar as categorias
    carregarCategorias();
  }, []);


  const updatepostarServico = useCallback((info) => {
    setServico(info);
    
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
        logoutUser,
        loginUser,
        loginInfo,
        updateLogininfo,
        loginError,
        loginLoading,
        PostarServico,
        Servico,
        endereco,
        setEndereco,
        updatepostarServico,
        categorias,
        fetchData,
        cepError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
