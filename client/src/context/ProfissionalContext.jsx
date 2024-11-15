import { createContext, useState, useEffect, useCallback } from "react";
import { postRequest, baseUrl, getRequest, putRequest } from "../utils/services";
import axios from "axios";
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
  const registerPro = useCallback(async (e) => {
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
  });

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

        if (response.error) setloginError(response.error);
        else {
          const user = localStorage.getItem("User");
          if (user) {
            localStorage.removeItem("User");
            localStorage.setItem("pro", JSON.stringify(response.user));
            window.location.reload();
          } else {
            console.log(response.user);
            localStorage.setItem("pro", JSON.stringify(response.user));
            window.location.reload();
          }
        }
      } catch (error) {
        setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
        setRegisterLoading(false);
      }
    },
    [loginInfo]
  );
  const [profissional, setProfissional] = useState(null);
  const [imagens, setimagens] = useState(null);
  const [comentario, setComentarios] = useState(null);
  const [Dadosiniciais, setDadosIniciais] = useState([]);
  const [Dadosprivate, setDadosprivate] = useState([]);
  const [ServicosEnd, setServicosEnd] = useState([]);
  const [ServicosHistory, setServicosHistory] = useState([]);
  const [dashbord, setDashbord] = useState([]);
  const [num, setnum] = useState([])
  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        if (pro && pro.id_profissional) {
          const response = await postRequest("/professional/servicoscard", {
            id_profissional: pro.id_profissional,
          });
          const responseprivate = await postRequest(
            "/professional/servicoscardprivate",
            { id_profissional: pro.id_profissional }
          );
          const perfilpro = await getRequest(
            `/professional/perfil/${pro.id_profissional}`
          );
          const historico = await getRequest(
            `/professional/history/${pro?.id_profissional}`
          );
          const dashbord = await getRequest(
            `/professional/dashboard/${pro?.id_profissional}`
          );
          console.log(dashbord)
          const ServiceEnd = await postRequest("/professional/serviceEnd", {
            id_profissional: pro?.id_profissional,
          });
          const responseNum = await getRequest(`/professional/nservice/${pro?.id_profissional}`);

          setDashbord(dashbord)
          setServicosHistory(historico)
          setnum(responseNum)
          setServicosEnd(ServiceEnd.user);
          console.log(responseprivate.user, "apapapappapap")
          setProfissional(perfilpro.pro);
          setimagens(perfilpro.images);
          setComentarios(perfilpro.comentarios);
          setDadosIniciais(response.user);
          setDadosprivate(responseprivate.user);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchDataFromBackend();
  }, [pro]);

  const [changedProData, setChangedProData] = useState({});
  const [modalShown, setShowModal] = useState(null);

  const functionUpdateInfoPro = useCallback(async () => {
    console.log("funfou", changedProData);

    const response = await postRequest(
      "/professional/updateInfoPro",
      changedProData
    );
    setPro(response.user);
    console.log(response.user);

    localStorage.setItem("pro", JSON.stringify(response.user));
    setShowModal(null);
  }, [changedProData]);

  const logoutPro = useCallback(() => {
    localStorage.removeItem("pro");
    setPro(null);
    localStorage.removeItem("modalShown");
    setShowModal(null);
    window.location.reload();
  }, []);

  const [modal, setModal] = useState(0);
  const [modalS, setModalShown] = useState(false);

  useEffect(() => {
    // Verifica se o modal já foi exibido, se o usuário está logado e se está na página inicial
    if (pro && window.location.pathname === "/homeProfissionais") {
      // Verifica se é necessário exibir o modal com base nas informações do usuário
      if (Object.keys(pro).length > 0) {
        if (
          pro.sg_sexoProfissional == null &&
          pro.qt_idadeProfissional == null
        ) {
          setModal(1);
          setModalShown(true);
        }
      }
    }
  }, [pro]);

  const [infoConfirm, setInfoConfirm] = useState({
    categorias: [], // Inicializa categorias como um array vazio
  });

  /********************/

  const [cepError, setCepError] = useState(false);
  const [conclusionCadError, setConclusionCadError] = useState(false)

  const concluirCad = useCallback(
    async (e) => {
      if (pro && pro.id_profissional)
        infoConfirm.id_profissional = pro.id_profissional;

      const response = await postRequest(
        "/professional/concluirCad",
        infoConfirm
      );
      if (response.error) {
        setConclusionCadError(response.error);
        setModal(response.formstatus)
      } else {
        console.log(response.user);
        setModal(modal + 1);
        localStorage.setItem("pro", JSON.stringify(response.user));
        console.log(locationuser);
      }
    },
    [infoConfirm]
  );

  const [categorias, setCategorias] = useState([]);

  const fetchDataConcluir = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        const { uf, localidade, logradouro, bairro } = response.data;
        setCepError(false);
        setInfoConfirm({
          ...infoConfirm,
          cep,
          uf,
          localidade,
          logradouro,
          bairro,
        });
      } else {
        setCepError(true);
        setInfoConfirm({
          ...infoConfirm,
          cep,
          uf: null,
          localidade: null,
          logradouro: null,
          bairro: null,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const [imageInstace, setImagesInstance] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const saveimg = useCallback(
    async (e) => {
      if (pro) imageInstace.id_profissional = pro?.id_profissional;

      console.log(imageInstace);

      const response = await postRequest(
        "/professional/setimgGaleria",
        imageInstace
      );
      if (response.error) {
      } else {
        setimagens(response.user);
        setImagemSelecionada(null);
      }
    },
    [imageInstace]
  );

  const submitforCLient = useCallback(async (id)=>{
    console.log(id)
    if(pro && pro.id_profissional){
    const response  = await postRequest(`/professional/setconcluir`, {id_servico: id, id_profissional: pro?.id_profissional})
    if(response.error){

    }else{
      setServicosEnd(response.user)
    }
  }
  }, [pro])

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
        setDadosIniciais,
        conclusionCadError,
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
        setCategorias,
        fetchDataConcluir,
        cepError,
        Dadosprivate,
        saveimg,
        setImagesInstance,
        imagemSelecionada,
        ServicosEnd,
        num,
        setnum,
        setServicosEnd,
        setImagemSelecionada,
        profissional,
        imagens,
        comentario,
        ServicosHistory,
        submitforCLient
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};
