import { createContext, useState, useEffect, useCallback } from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
export const ProfessionalContext = createContext();

export const ProfessionalContextProvider = ({ children }) => {

  const [pro, setPro] = useState({});

  useEffect(() => {
    const pro = localStorage.getItem("pro");
    setPro(JSON.parse(pro));
  }, []);

  const [formDataCadastroPro, setFormDataCadastroPro] = useState({
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
    setFormDataCadastroPro(info);
  }, []);

  // funcão de registro
  const registerPro = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await postRequest(
          "/professional/registerPro",
          formDataCadastroPro
        );

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
    [
      formDataCadastroPro,
      setRegisterError,
      setRegisterSucess,
      setRegisterLoading,
    ]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("pro");
    setPro(null);
    window.location.reload();
  }, []);

  //login
  const [loginError, setloginError] = useState(null);
  const [loginLoading, setloginLoading] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: null,
    senha: null,
  });

  const updateLogininfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  const loginPro = useCallback(
    async (e) => {
      e.preventDefault();
      setloginLoading(true);
      setloginError(null);
      try {
        const response = await postRequest("/professional/loginPro", loginInfo);

        if (response.error)
          setloginError(response.error);
        else {
          const user = localStorage.getItem("User");
          if (user) {
            localStorage.removeItem("User");
            localStorage.setItem("pro", JSON.stringify(response.user));
            window.location.reload()
          }
          else {
            console.log(response.user);
            localStorage.setItem("pro", JSON.stringify(response.user));
            window.location.reload()
          }
        }
      } catch (error) {
        setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
        setRegisterLoading(false);
      }
    },
    [loginInfo]
  );

  const [Dadosiniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {

      try {
        const response = await getRequest("/professional/servicoscard");
        console.log(response);
        setDadosIniciais(response);

      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchDataFromBackend()
  }, [])
  const [changedProData, setChangedProData] = useState({});
  const [modalShown, setShowModal] = useState(null);

  const functionUpdateInfoPro = useCallback(async () => {
    console.log("funfou", changedProData);

    const response = await postRequest("/professional/updateInfoPro", changedProData);
    setPro(response.user)
    console.log(response.user);

    localStorage.setItem("pro", JSON.stringify(response.user));
    setShowModal(null)

  }, [changedProData]);

  const logoutPro = useCallback(() => {
    localStorage.removeItem("pro");
    setPro(null);
    localStorage.removeItem("modalShown");
    setShowModal(null);
    window.location.reload();
  }, []);

  const [modal, setModal] = useState(0)
  const [modalS, setModalShown] = useState(false);

  useEffect(() => {
    const modalAlreadyShown = localStorage.getItem("modalShown");

    // Verifica se o modal já foi exibido, se o usuário está logado e se está na página inicial
    if (!modalAlreadyShown && pro && window.location.pathname === '/homeProfissionais') {
      // Verifica se é necessário exibir o modal com base nas informações do usuário
      if (Object.keys(pro).length > 0) {
        if (pro.sg_sexoProfissional == null && pro.qt_idadeProfissional == null) {
          setModal(1);
          setModalShown(true);
          localStorage.setItem("modalShown", true);
        }
      }
    }
  }, [pro]);

  const [infoConfirm, setInfoConfirm] = useState({
    categorias: [] // Inicializa categorias como um array vazio
  });
  
  /********************/


  const concluirCad = useCallback(async (e) => {
    console.log(infoConfirm)
    const response = await postRequest("/user/concluirCad", infoConfirm)
    if (response.error) {
      setConclusioncadError(response.error);
    } else {
      setModal(modal + 1)
      localStorage.setItem("User", JSON.stringify(response.user.clienteuser));
      localStorage.setItem("loc", JSON.stringify(response.user.localizacaoprincipal))
      console.log(locationuser)
    }
  }, [infoConfirm])

  const [categorias, setCategorias] = useState([]);

 

  
  


  return (
    <ProfessionalContext.Provider
      value={{
        pro,
        updateCadastro,
        formDataCadastroPro,
        registerError,
        registerSucess,
        registerLoading,
        registerPro,
        logoutUser,
        updateLogininfo,
        loginInfo,
        loginPro,
        modalShown,
        setShowModal,
        loginError,
        loginLoading,
        Dadosiniciais,
        logoutPro,
        changedProData,
        setChangedProData,
        functionUpdateInfoPro,
        infoConfirm,
        setInfoConfirm,
        modal,
        setModal,
        concluirCad,
        categorias,
         setCategorias
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};
