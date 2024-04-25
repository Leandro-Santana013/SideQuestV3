import {
  createContext,
  useState
} from "react";

export const ProfessionalContext = createContext();

export const ProfessionalContextProvider = ({children}) => {

  const [Pro, setPro] = useState({})

  useEffect(()=>{
      const pro = localStorage.getItem("Pro");
      setPro(JSON.parse(pro));
  },)

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
          const response = await postRequest("/auth/registerPro", formDataCadastroPro);

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
      [formDataCadastroPro, setRegisterError, setRegisterSucess, setRegisterLoading]
    );

    const logoutUser = useCallback(() => {
      localStorage.removeItem("Pro");
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


  useEffect(() => {
    console.log(user)

  }, [user]);

  const updateLogininfo = useCallback((info) => {
    setloginInfo(info);
  }, []);

  const loginPro = useCallback(async (e) => {
    e.preventDefault();
    setloginLoading(true);
    setloginError(null);
    try {
      const response = await postRequest("/auth/login", loginInfo);

      if (response.error) setloginError(response.error);
      else {
        console.log(response.user)
        localStorage.setItem("Pro", JSON.stringify(response.user));
        window.location.reload();
      }
    } catch (error) {
      setRegisterError("Erro ao logar. Por favor, tente novamente."); // Define o estado de erro com uma mensagem genérica de erro
      setRegisterLoading(false);
    }
  }, [loginInfo]);

    
return (
  <ProfessionalContext.Provider
      value={{
          Pro,
          updateCadastro,
          registerError,
          registerSucess,
          registerLoading,
          updateCadastro,
          registerPro,
          logoutUser,
          updateLogininfo,
          loginInfo,
          loginPro,
          loginError,
          loginLoading

      }}
  >
   {children}
  </ProfessionalContext.Provider>
)


}
