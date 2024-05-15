import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { postRequest, getRequest } from "../utils/services";
import axios from "axios";

type Props = {
  children: ReactNode;
};

type UserType = {
  id_cliente: number;
  nm_cliente: string;
  sg_sexoCliente: string | undefined | null;
  qt_idadeCliente: number;
  nmr_telefoneCliente: number | undefined | null;
  cd_emailCliente: string;
  img_cliente: any;
};

type ServicoType = {
  titulo: string | undefined | null;
  dsServico: string | undefined | null;
  cep: string | undefined | null;
  uf_localidade: string | undefined | null;
  logradouro: string | undefined | null;
  bairro: string | undefined | null;
  nmrResidencia: number | undefined | null;
  categoria: string | undefined | null;
  complemento: string | undefined | null;
  idCliente: number | undefined | null;
  email: string | undefined | null;
  imagens: any;
};

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType>();
  const [modalShown, setModalShown] = useState(false);
  const [servico, setServico] = useState<ServicoType>();
  const [infoConfirm, setInfoConfirm] = useState({});
  const [changedUserData, setChangedUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [locationuser, setLocationUser] = useState(null);
  const [cepError, setCepError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(1);
  const [modalPostar, setModalPostar] = useState(false);
  const [errorPostar, setErrorPostar] = useState(false);
  const [messageErrorPostar, setmessageErrorPostar] = useState(null);
  const [modal, setModal] = useState(0);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("User");
    const transformedDataUser = JSON.parse(userFromStorage as string);
    setUser(transformedDataUser);
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

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser("" as any);
    localStorage.removeItem("modalShown");
    setModalShown(false);
    window.location.reload();
  }, []);

  useEffect(() => {
    setServico((prevServico: any) => ({
      ...prevServico,
      idCliente: user ? user.id_cliente : null,
      email: user ? user.cd_emailCliente : null,
    }));

    setInfoConfirm((prevServico) => ({
      ...prevServico,
      id_cliente: user ? user.id_cliente : null,
    }));
  }, [user]);

  const functionUpdateInfoUser = useCallback(async () => {
    try {
      const response = await postRequest(
        "/user/updateInfoUser",
        changedUserData
      );
      setUser(response.user);
      localStorage.setItem("User", JSON.stringify(response.user));
      console.log(response.user);
    } catch (error) {
      console.log("deu merda", error);
    }
  }, [changedUserData]);

  useEffect(() => {
    const modalAlreadyShown = localStorage.getItem("modalShown");

    if (
      modalAlreadyShown !== "verdadeiro" &&
      user &&
      window.location.pathname === "/homeCliente"
    ) {
      if (Object.keys(user).length > 0) {
        if (user.qt_idadeCliente) {
          setModal(1);
          setModalShown(true);
          localStorage.setItem("modalShown", "verdadeiro");
        }
      }
    }
  }, [user]);

  const concluirCad = useCallback(async () => {
    console.log(infoConfirm);
    try {
      const response = await postRequest("/user/concluirCad", infoConfirm);
      setModal(modal + 1);
      localStorage.setItem("User", JSON.stringify(response.user.clienteuser));
      setLocationUser(response.user.localizacaoprincipal);
    } catch (error) {
      console.log(error);
    }
  }, [infoConfirm]);

  const postarServico = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setModalPostar(false);

      try {
        const response = await postRequest("/user/postarServico", servico);
        if (response.error) {
          setmessageErrorPostar(response.error);
          setErrorPostar(true);
          setForm(response.formstatus);

          setTimeout(() => {
            setErrorPostar(false);
            setmessageErrorPostar(null);
          }, 4000);
        } else {
          setModalPostar(true);
        }
      } catch (error) {
        console.log(
          //@ts-ignore
          error.response?.data?.message || "Erro ao cadastrar. Tente novamente."
        );
      }
    },
    [servico]
  );

  const fetchData = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data) {
        const { uf, localidade, logradouro, bairro } = response.data;
        setCepError(false);
        setServico({
          ...servico,
          cep,
          uf_localidade: `${uf} - ${localidade}`,
          logradouro,
          bairro,
        } as any);
      } else {
        setCepError(true);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const fetchDataConcluir = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data) {
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

  const updatepostarServico = useCallback((info: any) => {
    setServico(info);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        logoutUser,
        postarServico,
        servico,
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
        modal,
        setModal,
        infoConfirm,
        setInfoConfirm,
        concluirCad,
        fetchDataConcluir,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
