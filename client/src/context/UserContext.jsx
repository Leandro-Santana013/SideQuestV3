import { createContext, useCallback, useEffect, useState } from "react";
import {
  postRequest,
  baseUrl,
  getRequest,
  putRequest,
  delRequest
} from "../utils/services";
import axios from "axios";
import { file } from "jszip";
import { Infoinc } from "../components/Infoinc/Infoinc";
import JSZip from "jszip";
import { Navigate } from "react-router-dom";
export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {

  //objeto de usuario
  const [user, setUser] = useState({});
  const [locationuser, setlocationuser] = useState(null);

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

  // para passar modalShow true depois do login pra aparecer o modal corretamente
  const [localStorageSetado, selLocalStorageSetado] = useState(false);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setloginLoading(true);
      setloginError(null);
      try {
        const response = await postRequest("/user/login", loginInfo);

        if (response.error) setloginError(response.error);
        else {
          const pro = localStorage.getItem("pro");
          if (pro) {
            localStorage.removeItem("pro");
            setlocationuser(response.user.localizacaoprincipal);
            localStorage.setItem(
              "User",
              JSON.stringify(response.user.clienteuser)
            );
            if(response.user.localizacaoprincipal){
            localStorage.setItem(
              "loc",
              JSON.stringify(response.user.localizacaoprincipal)
            );
          }
            window.location.reload();
            selLocalStorageSetado(true);
          } else {
            localStorage.setItem(
              "User",
              JSON.stringify(response.user.clienteuser)
            );
            if(response.user.localizacaoprincipal){
            localStorage.setItem(
              "loc",
              JSON.stringify(response.user.localizacaoprincipal)
            );
          }
            window.location.reload();
            selLocalStorageSetado(true);
          }
        }
      } catch (error) {
        setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
        setRegisterLoading(false);
      }
    },
    [loginInfo]
  );

  useEffect(() => {
    const userFromStorage = localStorage.getItem("User");
    setUser(JSON.parse(userFromStorage));

    const locFromStorage = localStorage.getItem("loc");
    setlocationuser(JSON.parse(locFromStorage));
  }, []);

  //logout

  const [ConclussioncadError, setConclusioncadError] = useState(null);
  const [modalShown, setModalShown] = useState(false);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    localStorage.removeItem("modalShown");
    setModalShown(false);
    localStorage.removeItem("loc");
    window.location.reload();

    selLocalStorageSetado(false);
  }, []);

  const updateLogininfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  /********************/

  const [changedUserData, setChangedUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

 

  const [modal, setModal] = useState(0);

  useEffect(() => {
    const modalAlreadyShown = localStorage.getItem("modalShown");

    // Verifica se o modal já foi exibido, se o usuário está logado e se está na página inicial
    if (
      !modalAlreadyShown &&
      user &&
      window.location.pathname === "/homeCliente"
    ) {
      // Verifica se é necessário exibir o modal com base nas informações do usuário
      if (Object.keys(user).length > 0) {
        if (user.qt_idadeCliente == null && user.qt_idadeCliente == null) {
          setModal(1);
          setModalShown(true);
          localStorage.setItem("modalShown", true);
        }
      }
    }
  }, [user]);

  const [infoConfirm, setInfoConfirm] = useState({});
  /********************/

  const concluirCad = useCallback(
    async (e) => {
      console.log(infoConfirm);
      const response = await postRequest("/user/concluirCad", infoConfirm);
      if (response.error) {
        setConclusioncadError(response.error);
        setModal(response.formstatus)
      } else {
        setModal(modal + 1);
        localStorage.setItem("User", JSON.stringify(response.user.clienteuser));
        localStorage.setItem(
          "loc",
          JSON.stringify(response.user.localizacaoprincipal)
        );
        console.log(locationuser);
      }
    },
    [infoConfirm]
  );

  const [cepError, setCepError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(1);
  const [modalPostar, setModalPostar] = useState(false);
  const [errorPostar, setErrorPostar] = useState(null);
  const [messageErrorPostar, setmessageErrorPostar] = useState(null);

  const [Servico, setServico] = useState({});
  const [dataServico, setDataServico] = useState({});

  const [isCheckedLocation, setIsCheckedLocation] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (selectedImages.length > 0){
    const zipImages = async () => {
      const zip = new JSZip();
      // Adicione as imagens ao arquivo ZIP
      selectedImages.forEach((image, index) => {
        zip.file(`image_${index}.png`, image.split("base64,")[1], {
          base64: true,
        });
      });

      try {
        // Gerar o arquivo ZIP
        const content = await zip.generateAsync({ type: "blob" });
        const blobSize = content.size;

        // Criar um FileReader
        const reader = new FileReader();

        // Quando o FileReader carregar, converter para base64 e criar o objeto File
        reader.onload = () => {
          console.log(`Tamanho do arquivo ZIP: ${blobSize} bytes`);
          const base64String = reader.result.split(",")[1];
          const zipFile = {
            name: "images.zip",
            type: "application/zip",
            content: base64String,
          };

          // Converta zipFile para JSON
          const jsonZipFile = JSON.stringify(zipFile);

          // Atualizar o serviço com as imagens
          updatepostarServico({
            ...Servico,
            imagens: jsonZipFile,
          });
        };

        // Ler o conteúdo do arquivo como um ArrayBuffer
        reader.readAsDataURL(content);
      } catch (error) {
        console.error("Erro ao gerar o arquivo ZIP:", error);
      }
    };
    zipImages();
  }
  }, [selectedImages]);

  const PostarServico = useCallback(
    async (e) => {
      e.preventDefault();
      setModalPostar(false);

      try {
        if (user) {
          Servico.idCliente = user.id_cliente;
        }

        // Enviar o formulário com o estado formData atualizado
        const response = await postRequest("/user/postarServico", Servico);
        console.log("serviço 1");
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
        console.error("Erro ao postar:", error);
      }
    },
    [Servico, user]
  );

  const PostarServicoWithLoc = useCallback(
    async (e) => {
      e.preventDefault();

      setModalPostar(false);

      try {
        if (user) {
          dataServico.idCliente = user.id_cliente;
        }
        // Enviar o formulário com o estado formData atualizado
        const response = await postRequest(
          "/user/postarServicoLoc",
          dataServico
        );
        console.log("serviço com loc");
        console.log(dataServico);

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
          setSelectedImages([]);
          setServico({});
          setDataServico({});
          setForm(1);
        }
      } catch (error) {
        console.error("Erro ao postar:", error);
      }
    },
    [dataServico]
  );

  useEffect(() => {
    console.log(user);

    setInfoConfirm((prevServico) => ({
      ...prevServico,
      id_cliente: user ? user.id_cliente : null,
    }));
  }, [user, locationuser]);

  useEffect(() => {
    setDataServico((setDataServico) => ({
      ...setDataServico,
      idCliente: user ? user.id_cliente : null,
      location: locationuser ? locationuser.id_endereco : null,
      servico: Servico,
    }));
  }, [user, Servico, locationuser]);

  const [mudandoloc, setmudandoloc] = useState(null);
  const [cepConfig, setCepConfig] = useState(null);
  const fetchData = async (cep, p2) => {
    try {
      console.log(cep, p2);
      if (p2) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (!response.data.erro) {
          const { uf, localidade, logradouro, bairro } = response.data;
          setCepConfig(false);
          setmudandoloc({
            ...mudandoloc,
            cep,
            uf_localidade: `${uf} - ${localidade}`,
            logradouro,
            bairro,
          });
        } else {
          setCepConfig(true);
        }
      }

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
  }, []);

  const updatepostarServico = useCallback((info) => {
    setServico(info);
  }, []);
  const [ServiceEnd, setserviceEdn] = useState(null);
  const [ServicePend, setservicePedn] = useState(null);
  const [Servicehistorico, setservicehistorico] = useState(null);
  const [num, setnum] = useState(null)

  useEffect(() => {
    const calls = async () => {
      if (user && user.id_cliente) {
        const response = await postRequest("/user/serviceend", {
          id_cliente: user.id_cliente,
        });
        const responsePend = await postRequest("/user/servicePend", {
          id_cliente: user.id_cliente,
        });
       

        const responsehistorico = await postRequest("/user/serviceHistorico", {
          id_cliente: user.id_cliente,
        });
        setservicehistorico(responsehistorico.user)
        const responseNum = await getRequest(`/user/nservice/${user.id_cliente}`);
          setnum(responseNum)
        setserviceEdn(response.user); 

        console.log(response.user, "type")
        setservicePedn(responsePend.user);
      }
    };
    calls();
  }, [user]);

  const functionUpdateInfoUser = useCallback(async () => {
    if (!locationuser) changedUserData.adressset = true 
    const response = await postRequest("/user/updateInfoUser", changedUserData);
    setUser(response.user.clienteuser);
    localStorage.setItem("User",JSON.stringify(response.user.clienteuser));
    if(response.user.localizacaoprincipal){
      setlocationuser(response.user.localizacaoprincipal);
      localStorage.setItem("loc", JSON.stringify(response.user.localizacaoprincipal));
    }
    setShowModal(null);
  }, [changedUserData]);

  const deleteuser = useCallback(async () => {

    const response = await delRequest(`/user/deleteAllintances/${user?.id_cliente}`,);

    selLocalStorageSetado(false);
  }, [user]);

  const [pass, setpass] = useState(null);
  const [levelSecPass, setLevelSecPass] = useState(null)
  const [passSucess, setpassSucess] = useState(null);
  const [passErrorCompare, setpassErrorCompare] = useState(null);
  const [alterpass, setAlterPass] = useState(null)

  const comparePassword = useCallback(async (save) => {
   
    if (user) pass.id = user.id_cliente;

    if (save){
      pass.saveControll = true
      console.log(pass)
      const response = await postRequest("/user/resetPass", pass);
      if(response.error){ 
        setLevelSecPass(response.error)
      }else {
        setAlterPass(response.message)
      }
      return
    }

    const response = await postRequest("/user/resetPass", pass);
    if (response.error){ 
      setpassErrorCompare(true)
      setpassSucess(null)
    }
    else{
       setpassSucess(true)
       setpassErrorCompare(false)
    }
  }, [pass, user]);
  
  const [avaliacao,  setAvaliacao] = useState({})
  const avaliar = useCallback(async (e) =>{
    console.log(avaliacao)
    const response = await postRequest("/user/terminarServico", avaliacao);
   }, [avaliacao])
   const [typemodal, setTypemodal] = useState(1)
   const [objectPass, setObjectPass] = useState(null)
   const [errorpass, seterrorpass] =useState(null)
   const [errorpassMessage, seterrorpassMessage] =useState(null)
   const calbackpassword = useCallback(async (e) =>{
    e.preventDefault()
    console.log(objectPass)
    const response = await postRequest("/user/reqpassword", objectPass);
  
    if (response.error){ 
      seterrorpass(true)
      seterrorpassMessage(response.error)
    }
    else{
      seterrorpass(null)
      setTypemodal(typemodal + 1)
      errorpassMessage(null)
    }
    objectPass.tokenpass ? objectPass.tokenpass = null : ""
   }, [objectPass])
  
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
          setCepError,
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
          modal,
          setModal,
          infoConfirm,
          setInfoConfirm,
          concluirCad,
          ConclussioncadError,
          fetchDataConcluir,
          locationuser,
          isCheckedLocation,
          setIsCheckedLocation,
          PostarServicoWithLoc,
          selectedImages,
          setSelectedImages,
          ServiceEnd,
          ServicePend,
          Servicehistorico,
          mudandoloc,
          setmudandoloc,
          cepConfig,
          setCepConfig,
          comparePassword,
          setpass,
          passSucess,
          setpassSucess,
          passErrorCompare,
          setpassErrorCompare,
          alterpass,
          levelSecPass,
          setLevelSecPass,
          setAlterPass,
          deleteuser,
          num,
          avaliar,
          setAvaliacao,
          calbackpassword,
          setObjectPass,
          typemodal,
          setTypemodal,
          errorpass,
          errorpassMessage,
          seterrorpass,
          seterrorpassMessage
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };