import { createContext, useCallback, useEffect, useState } from "react";
import {
  postRequest,
  baseUrl,
  getRequest,
  putRequest,
} from "../utils/services";
export const UserContext = createContext();
import axios from "axios";
import { file } from "jszip";



export const UserContextProvider = ({ children }) => {
  //objeto de usuario
  const [user, setUser] = useState({});

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
        const response = await postRequest("/user/register", formDataCadastro);

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



  useEffect(() => {
    const userFromStorage = localStorage.getItem("User");
    if (userFromStorage) {
      // Se o usuário já estiver no armazenamento local, define-o no estado
      setUser(JSON.parse(userFromStorage));
    }
  }, []); // Adicionando localStorage.getItem("User") como dependência
  // Adicionando userFromStorage como dependência
  

  useEffect(() => {
    console.log(user);

    setServico((prevServico) => ({
      ...prevServico,
      idCliente: user ? user.id_cliente : null,
      email: user ? user.cd_emailCliente : null,
    }));
  }, [user]);

  const updateLogininfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  /********************/


  const [changedUserData, setChangedUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const functionUpdateInfoUser = useCallback(async () => {
    console.log(changedUserData);
    
    const response = await postRequest("/user/updateInfoUser", changedUserData);
    setUser(response.user)
    console.log(response.user); 
    localStorage.setItem("User", JSON.stringify(response.user));
    setShowModal(null)
}, [changedUserData]);






  /********************/

  //logout

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    window.location.reload();
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setloginLoading(true);
      setloginError(null);
      try {
        const response = await postRequest("/user/login", loginInfo);

        if (response.error) setloginError(response.error);
        else {
          localStorage.setItem("User", JSON.stringify(response.user));
          window.location.reload();
        }
      } catch (error) {
        setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
        setRegisterLoading(false);
      }
    },
    [loginInfo]
  );

  const [cepError, setCepError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(1);
  const [modalPostar, setModalPostar] = useState(false);
  const [errorPostar, setErrorPostar] = useState(null);
  const [messageErrorPostar, setmessageErrorPostar] = useState(null);

  const [Servico, setServico] = useState({
    titulo: null,
    dsServico: null,
    cep: null,
    uf_localidade: null,
    logradouro: null,
    bairro: null,
    nmrResidencia: null,
    categoria: null,
    complemento: null,
    idCliente: null,
    email: null,
    imagens: null,
  });

  const PostarServico = useCallback(
    async (e) => {
      e.preventDefault();
      setModalPostar(false);

      try {
        // Enviar o formulário com o estado formData atualizado
        const response = await postRequest("/user/postarServico", Servico);

        if (response.error) {
          setmessageErrorPostar(response.error);
          setErrorPostar(true);
          setForm(response.formstatus);

          setTimeout(() => {
            setErrorPostar(null);
            setmessageErrorPostar(null);
          }, 4000);
        } else {
          setModalPostar(true);
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        setMessage(
          error.response?.data?.message || "Erro ao cadastrar. Tente novamente."
        );
      }
    },
    [Servico]
  );

  const fetchData = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        const { uf, localidade, logradouro, bairro } = response.data;
        setCepError(false);
        setServico({
          ...Servico,
          cep,
          uf_localidade: `${uf} - ${localidade}`,
          logradouro,
          bairro,
        });
      } else {
        setCepError(true);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await getRequest("/user/selectCategoria");
        setCategorias(response); // Aqui estamos definindo o estado das categorias com a resposta do servidor
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    // Chama a função para buscar as categorias
    carregarCategorias();
  }, [user]);

  const updatepostarServico = useCallback((info) => {
    setServico(info);
  }, []);

  return (
    <UserContext.Provider
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
        setServico,
        updatepostarServico,
        categorias,
        fetchData,
        cepError,
        setModalPostar,
        modalPostar,
        errorPostar,
        form,
        setForm,
        messageErrorPostar,
        setChangedUserData,
        changedUserData,
        functionUpdateInfoUser,
        showModal,
        setShowModal,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
