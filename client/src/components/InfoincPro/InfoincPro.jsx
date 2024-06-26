import React, { useState, useEffect, useContext } from "react";
import { getRequest } from "../../utils/services"; // Certifique-se de importar corretamente seus serviços
import { ProfessionalContext } from "../../context/ProfissionalContext";
import "./infoIncPro.css";
import { IoCloseCircle } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import InputMask from "react-input-mask";

export const InfoincPro = () => {
  const {
    modal,
    setModal,
    setInfoConfirm,
    concluirCad,
    fetchDataConcluir,
    cepError,
    categorias,
    setCategorias,
    conclusionCadError
  } = useContext(ProfessionalContext);

  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await getRequest("/user/selectCategoria");
        console.log("Dados das categorias carregados:", response);
        setCategorias(response);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    carregarCategorias();
  }, []);

  const handleCepChange = (e) => {
    const cep = e.target.value;
    const cepToFetch = cep;
    if (cep.length === 8) fetchDataConcluir(cepToFetch);
  };

  const handleChange = (field, event) => {
    const novoValor = event.target.value;
    setInfoConfirm((prevFormData) => ({
      ...prevFormData,
      [field]: novoValor,
    }));
  };

  const handleTelefoneChange = (event) => {
    const telefoneFormatado = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    setTelefone(telefoneFormatado);
    handleChange("telefone", { target: { value: telefoneFormatado } }); // Atualiza o estado com o valor formatado
  };

  const setModalConcluaRegistro = (param) => {
    if (param === 1) {
      setModal(modal + 1);
    } if (param === 2) {
      setModal(modal - 1);
    } else if (param === 0) {
      setModal(0);
    }
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);

  const handleCategorySelect = (e) => {
    const selectedCategoryName = e.target.value;
    console.log("entrou");
    console.log("Nome da categoria selecionada:", selectedCategoryName);
    console.log("Categorias disponíveis:", categorias);

    const selectedCategory = categorias.find(
      (categoria) => categoria.ds_categoria === selectedCategoryName
    );

    if (selectedCategory) {
      console.log("Categoria encontrada:", selectedCategory);
      if (!selectedCategoryNames.includes(selectedCategoryName)) {
        console.log("Categoria selecionada:", selectedCategory);
        setSelectedCategories((prevSelectedCategories) => [
          ...prevSelectedCategories,
          selectedCategory,
        ]);
        setSelectedCategoryNames((prevSelectedCategoryNames) => [
          ...prevSelectedCategoryNames,
          selectedCategoryName,
        ]);
        setInfoConfirm((prevInfoConfirm) => ({
          ...prevInfoConfirm,
          categorias: [...prevInfoConfirm.categorias, selectedCategory],
        }));
      }
    } else {
      console.log(
        "Categoria não encontrada para o nome:",
        selectedCategoryName
      );
    }
  };

  const handleCategoryRemove = (categoryName) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.filter(
        (category) => category.ds_categoria !== categoryName
      )
    );
    setSelectedCategoryNames((prevSelectedCategoryNames) =>
      prevSelectedCategoryNames.filter(
        (name) => name !== categoryName
      )
    );
    setInfoConfirm((prevInfoConfirm) => ({
      ...prevInfoConfirm,
      categorias: prevInfoConfirm.categorias.filter(
        (category) => category.ds_categoria !== categoryName
      ),
    }));
  };

  return (
    <>
      {modal !== 0 && (
        <div className="modal-card-conclua-registro">
          {modal === 1 && (
            <div className="card-conclua-registro">
              <div className="top-card-conclua-registro">
                <h1>Conclua o seu registro</h1>
                <p>
                  Finalize o seu cadastro para uma melhor experiência em nossa
                  plataforma
                </p>
                {conclusionCadError && <p style={{color: 'red'}}>{conclusionCadError}</p>}
              </div>
              <div className="inputs-card-conclua-registro">
                <p>Telefone ou celular</p>
                <InputMask
                  className="nmr-telefone"
                  mask="(99) 99999-9999"
                  placeholder="Ex: (13) 99116-5590"
                  value={telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")} // Aplica a máscara no valor armazenado
                  onChange={handleTelefoneChange}
                />
                <p>Data de nascimento</p>
                <input
                  className="data"
                  type="date"
                  onChange={(event) => handleChange("data", event)}
                />
                <p>Sexo</p>
                <select onChange={(event) => handleChange("sexo", event)}>
                  <option value="-">Prefiro não dizer</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
              <div className="bottom-card-conclua-registro" style={{justifyContent: 'center'}}>
                <button onClick={() => setModalConcluaRegistro(1)}>
                  Próximo
                </button>
              </div>
            </div>
          )}

          {modal === 2 && (
            <div className="card-conclua-registro">
              <div className="top-card-conclua-registro">
                <h1>Conclua o seu registro</h1>
                <p>
                  Insira o seu endereço (você poderá adicionar outros
                  posteriormente).
                </p>
                {conclusionCadError && <p style={{color: 'red'}}>{conclusionCadError}</p>}
              </div>
              <div className="inputs-card-conclua-registro">
                <div className="grid-2x2-card-conclua-registro">
                  <div className="inputs-card-conclua-registro-cep">
                    {cepError && (
                      <p className="cepError-conluircad">CEP incorreto</p>
                    )}
                    <input
                      className="padrao-input-card-conclua-registro"
                      type="number"
                      placeholder="Cep"
                      style={{
                        border: cepError && "2px solid red",
                      }}
                      onChange={(event) => {
                        handleChange("cep", event);
                        handleCepChange(event);
                      }}
                    />
                  </div>
                  <input
                    className="padrao-input-card-conclua-registro"
                    type="number"
                    placeholder="Nº"
                    onChange={(event) =>
                      handleChange("numeroResidencia", event)
                    }
                  />
                  <input
                    className="padrao-input-card-conclua-registro"
                    type="text"
                    placeholder="Complemento"
                    onChange={(event) => handleChange("complemento", event)}
                  />
                </div>
              </div>
              <div className="bottom-card-conclua-registro">
                <p onClick={() => setModalConcluaRegistro(2)}>Voltar</p>
                <button onClick={() => setModalConcluaRegistro(1)}>
                  Próximo
                </button>
              </div>
            </div>
          )}

          {modal === 3 && (
            <>
              <div className="card-conclua-registro">
                <div className="top-card-conclua-registro">
                  <h1>Conclua o seu registro</h1>
                  <p>Escolha as categorias de serviço em que você trabalha</p>
                  {conclusionCadError && <p style={{color: 'red'}}>{conclusionCadError}</p>}
                </div>
                {categorias.length > 0 ? (
                  <>
                    <select
                      id="categoriaSelect"
                      className="categorias"
                      onChange={handleCategorySelect}
                    >
                      <option value="" disabled selected>
                        Selecione uma categoria
                      </option>
                      {categorias.map((categoria) => (
                        <option
                          key={categoria.cd_categoria}
                          value={categoria.ds_categoria}
                        >
                          {categoria.ds_categoria}
                        </option>
                      ))}
                    </select>
                    <div className="selected-categories">
                      {selectedCategories.length === 0 ? (
                        <div>Nenhuma categoria selecionada</div>
                      ) : (
                        selectedCategories.map((category) => (
                          <div key={category.cd_categoria} className="category-card">
                            <p>{category.ds_categoria}</p>
                            <IoCloseCircle onClick={() => handleCategoryRemove(category.ds_categoria)} />
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <p>Carregando categorias...</p>
                )}
                <p>Insira uma descrição ao seu perfil:</p>
                <input
                  className="padrao-input-card-conclua-registro"
                  placeholder="Descrição"
                  onChange={(event) => {
                    handleChange("descricao", event);
                  }}
                />
                <div className="bottom-card-conclua-registro">
                  <p onClick={() => setModalConcluaRegistro(2)}>Voltar</p>
                  <button onClick={() => { concluirCad() }}>Finalizar</button>
                </div>
              </div>
            </>
          )}
          {modal == 4 && (
            <>
              <div className="card-conclua-registro">
                <RiVerifiedBadgeFill style={{ color: 'var(--verde)', fontSize: '5vw' }} />
                <h1>Cadastro completo!</h1>
                <p style={{ color: 'gray', textAlign: "center", }}>Obrigado por fornecer mais informações sobre você. Esta atitude ajuda muito a nossa comunidade.</p>
                <button style={{ display: "flex", alignItems: 'center', justifyContent: 'center !important' }} onClick={() => setModal(0)}>Fechar</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
