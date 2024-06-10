const { Model, Op, Sequelize } = require("sequelize");
const { raw } = require("mysql2");
const {
  ModelCliente,
  ModelProfissional,
  ModelEndereco,
  ModelCategoria,
  ModelCidade,
  ModelPostagemServico,
  ModelConfirmacaoServico,
  ModelTerminoServico,
  ModelAvaliacao,
  ModelInfoProfissional,
  ModelProfissionalCategoria,
  ModelProfissionalProfileImg,
  ClienteProfissionalFavorito,
  ModelEnderecoProfissional,
} = require("../../models/index");
const { Service, Servicehistory } = require("../userController");

module.exports = {
  bindCookieBypkCliente: async (req, res) => {
    const { cd_emailCliente } = req.params;
    return ModelCliente.findOne({
      where: {
        cd_emailCliente: cd_emailCliente,
      },
    });
  },

  findEmailCliente: async (req, res) => {
    const { cd_emailCliente } = req.params;
    return ModelCliente.findAll({
      attributes: ["cd_emailCliente", "cd_senhaCliente"],
      where: {
        cd_emailCliente: cd_emailCliente,
      },
    });
  },
  findcpfCliente: async (req, res) => {
    const { cd_cpfCliente } = req.params;
    return ModelCliente.findAll({
      attributes: ["cd_cpfCliente"],
      where: {
        cd_cpfCliente: cd_cpfCliente,
      },
    });
  },

  insertClient: async (req, res) => {
    const { nm_cliente, cd_cpfCliente, cd_emailCliente, cd_senhaCliente } =
      req.params; // Assumindo que o nome da marca está no corpo da requisição
    return ModelCliente.create({
      nm_cliente: nm_cliente,
      cd_emailCliente: cd_emailCliente,
      cd_cpfCliente: cd_cpfCliente,
      cd_senhaCliente: cd_senhaCliente,
    });
  },

  findtokenCliente: async (req, res) => {
    try {
      const { cd_emailCliente } = req.params;
      const cliente = await ModelCliente.findOne({
        attributes: ["cd_tokenCliente"],
        where: {
          cd_emailCliente: cd_emailCliente,
        },
      });
      console.log("Cliente encontrado:", cliente);
      return cliente ? cliente.cd_tokenCliente : null;
    } catch (error) {
      console.error("Erro ao buscar token por email:", error);
      // Lide com o erro de alguma forma apropriada para sua aplicação
      throw error;
    }
  },
  updateTokenByEmail: async (req, res) => {
    const { cd_emailCliente, cd_tokenCliente } = req.params;
    return ModelCliente.update(
      { cd_tokenCliente: cd_tokenCliente },
      { where: { cd_emailCliente: cd_emailCliente } }
    );
  },

  updateSenha: async (req, res) => {
    const { id_cliente, cd_senhaCliente } = req.params;
    return ModelCliente.update(
      { cd_senhaCliente: cd_senhaCliente },
      { where: { id_cliente: id_cliente } }
    );
  },

  selectInfocliente: async (req, res) => {
    const { id_cliente } = req.params;
    return ModelCliente.findOne({
      where: {
        id_cliente: id_cliente,
      },
      raw: true,
    });
  },

  //2
  selectCategorias: async (req, res) => {
    return ModelCategoria.findAll({
      attributes: ["ds_categoria"],
      order: [["ds_categoria", "ASC"]],
      raw: true,
    });
  },

  selectCategoriaescolhida: async (req, res) => {
    const { ds_categoria } = req.params;
    return ModelCategoria.findOne({
      where: {
        ds_categoria: ds_categoria,
      },
      raw: true,
    });
  },
  selectCidadeAdress: async (req, res) => {
    const { nm_cidade, sg_estado, id_cidade } = req.params;
    if (id_cidade) {
      return ModelCidade.findOne({
        attributes: ["nm_cidade", "sg_estado"],
        where: {
          id_cidade: id_cidade,
        },
        raw: true,
      });
    }
    return ModelCidade.findOne({
      attributes: ["id_cidade"],
      where: {
        nm_cidade: nm_cidade,
        sg_estado: sg_estado,
      },
      raw: true,
    });
  },
  findCdCliente: async (req, res) => {
    const { cd_cpfCliente } = req.params;
    return ModelCliente.findOne({
      attributes: ["id_cliente"],
      where: {
        cd_cpfCliente: cd_cpfCliente,
      },
      raw: true,
    });
  },

  CreateadressService: async (req, res) => {
    const {
      id_cliente,
      nm_logradouro,
      cd_cep,
      id_cidade,
      nm_bairro,
      nmr_casa,
    } = req.params;
    try {
      const [enderecoInstance, created] = await ModelEndereco.findOrCreate({
        where: {
          id_cliente: id_cliente,
          id_cidade: id_cidade,
          nm_logradouro: nm_logradouro,
          cd_cep: cd_cep,
          nm_bairro: nm_bairro,
          nmr_casa: nmr_casa,
        },
      });
      return enderecoInstance;
    } catch (error) {
      console.error("Erro ao criar ou encontrar endereço:", error);
      throw error;
    }
  },

  CreateServico: async (req, res) => {
    const {
      ds_servico,
      ds_titulo,
      id_cliente,
      id_categoria,
      id_endereco,
      img_servico,
      tm_postagem,
      pr_escolhido,
    } = req.params;
    return ModelPostagemServico.create({
      id_cliente: id_cliente,
      id_categoria: id_categoria,
      id_endereco: id_endereco,
      ds_servico: ds_servico,
      ds_titulo: ds_titulo,
      img_servico: img_servico,
      tm_postagem: tm_postagem,
      pr_escolhido: pr_escolhido,
    });
  },

  //6

  selectProfissional: async (req, res) => {
    try {
      return ModelProfissional.findAll({
        attributes: [
          "id_profissional",
          "sg_sexoProfissional",
          "nm_profissional",
          "img_profissional",
          [Sequelize.col("tb_infoProfissional.ds_biografia"), "ds_biografia"],
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.col(
                "tb_confirmacaoServicos.tb_terminoServico.id_terminoServico"
              )
            ),
            "num_servicos_terminados",
          ],
          [
            Sequelize.fn(
              "SUM",
              Sequelize.col(
                "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
              )
            ),
            "total_avaliacoes",
          ],
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.col(
                "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.id_avaliacao"
              )
            ),
            "num_avaliacoes",
          ],
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn(
                "AVG",
                Sequelize.col(
                  "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
                )
              ),
              0
            ),
            "media_avaliacoes",
          ],
        ],
        include: [
          {
            model: ModelInfoProfissional,
            attributes: [],
          },
          {
            model: ModelConfirmacaoServico,
            attributes: [],
            include: [
              {
                model: ModelTerminoServico,
                attributes: [],
                include: [
                  {
                    model: ModelAvaliacao,
                    attributes: [],
                  },
                ],
              },
            ],
          },
          {
            model: ModelProfissionalCategoria,
            attributes: ["id_categoria"],
            include: [
              {
                model: ModelCategoria,
                attributes: ["ds_categoria"],
              },
            ],
          },
        ],
        group: [
          "tb_profissional.id_profissional",
          "tb_profissional_categoria.tb_categorium.id_categoria",
          "tb_profissional_categoria.id_categoriaEscolhida",
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      res.status(500).send("Erro ao buscar profissionais");
    }
  },

  updateInfoCli: async (req, res) => {
    const {
      id_cliente,
      nm_cliente,
      cd_emailCliente,
      img_cliente,
      nmr_telefoneCliente,
    } = req.params;
    return ModelCliente.update(
      {
        nm_cliente: nm_cliente,
        cd_emailCliente: cd_emailCliente,
        img_cliente: img_cliente,
        nmr_telefoneCliente: nmr_telefoneCliente,
      },
      { where: { id_cliente: id_cliente } }
    );
  },

  updateAdressCli: async (req, res) => {
    const {
      id_cliente,
      id_cidade,
      cd_cep,
      nm_bairro,
      nm_logradouro,
      nmr_casa,
      txt_complemento,
    } = req.params;
    return ModelEndereco.update(
      {
        id_cidade: id_cidade,
        cd_cep: cd_cep,
        nm_bairro: nm_bairro,
        nm_logradouro: nm_logradouro,
        nmr_casa: nmr_casa,
        txt_complemento: txt_complemento,
      },
      { where: { id_cliente: id_cliente, end_principal: true } }
    );
  },

  updateInfoCliente: async (req, res) => {
    const { id_cliente, qt_idadeCliente, sg_sexoCliente, nmr_telefoneCliente } =
      req.params;
    return ModelCliente.update(
      {
        qt_idadeCliente: qt_idadeCliente,
        sg_sexoCliente: sg_sexoCliente,
        nmr_telefoneCliente: nmr_telefoneCliente,
      },
      { where: { id_cliente: id_cliente } }
    );
  },

  selectallprofissionais: async (req, res) => {
    return ModelProfissional.findAll({
      raw: true,
    });
  },

  selectInfoProfissional: async (req, res) => {
    const { id_profissional } = req.params;
    return ModelProfissional.findOne({
      where: {
        id_profissional: id_profissional,
      },
      raw: true,
    });
  },

  createadresscli: async (req, res) => {
    const {
      id_cliente,
      nm_logradouro,
      cd_cep,
      id_cidade,
      nm_bairro,
      nmr_casa,
      end_principal,
      txt_complemento,
    } = req.params;
    try {
      return ModelEndereco.create({
        id_cliente: id_cliente,
        id_cidade: id_cidade,
        nm_logradouro: nm_logradouro,
        cd_cep: cd_cep,
        nm_bairro: nm_bairro,
        nmr_casa: nmr_casa,
        end_principal: end_principal,
        txt_complemento: txt_complemento,
      });
    } catch (error) {
      console.error("Erro ao criar ou encontrar endereço:", error);
      throw error;
    }
  },

  selectLocalcli: async (req, res) => {
    const { id_cliente } = req.params;
    return ModelEndereco.findOne({
      where: {
        id_cliente: id_cliente,
      },
      raw: true,
    });
  },

  queryPart1: async (req, res) => {
    const { id_profissional } = req.params;
    return ModelProfissional.findAll({
      where: { id_profissional: id_profissional },
      include: [
        {
          model: ModelInfoProfissional,
          attributes: [],
        },
        {
          model: ModelEnderecoProfissional,
          attributes: [],
          include: [
            {
              model: ModelCidade,
              attributes: [],
            },
          ],
        },
        {
          model: ModelProfissionalCategoria,
          attributes: ["id_categoria"],
          include: [
            {
              model: ModelCategoria,
              attributes: ["ds_categoria"],
            },
          ],
        },
        {
          model: ModelConfirmacaoServico,
          attributes: [],
          include: [
            {
              model: ModelTerminoServico,
              attributes: [],

              include: [
                {
                  model: ModelAvaliacao,
                  attributes: [],
                  include: [
                    {
                      model: ModelTerminoServico,
                      attributes: [],
                      include: [
                        {
                          model: ModelConfirmacaoServico,
                          attributes: [],
                          include: [
                            {
                              model: ModelPostagemServico,
                              attributes: [],
                              include: [
                                {
                                  model: ModelCliente,
                                  attributes: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      attributes: [
        "id_profissional",
        "sg_sexoProfissional",
        "img_profissional",
        "nm_profissional",
        [Sequelize.col("tb_infoProfissional.ds_biografia"), "ds_biografia"],
        [
          Sequelize.col("tb_enderecoProfissionals.tb_cidade.sg_estado"),
          "sg_estado",
        ],
        [
          Sequelize.col("tb_enderecoProfissionals.tb_cidade.nm_cidade"),
          "nm_cidade",
        ],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.col(
              "tb_confirmacaoServicos.tb_terminoServico.id_terminoServico"
            )
          ),
          "num_servicos_terminados",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.col(
              "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
            )
          ),
          "total_avaliacoes",
        ],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.col(
              "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.id_avaliacao"
            )
          ),
          "num_avaliacoes",
        ],
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn(
              "AVG",
              Sequelize.col(
                "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
              )
            ),
            0
          ),
          "media_avaliacoes",
        ],
      ],
      group: [
        "tb_profissional.id_profissional",
        "tb_profissional_categoria.id_categoriaEscolhida",
        "tb_enderecoProfissionals.tb_cidade.sg_estado",
        "tb_enderecoProfissionals.tb_cidade.nm_cidade",
      ], // Inclua todas as colunas não agregadas na cláusula GROUP BY
    });
  },
  queryPart2: async (req, res) => {
    const { id_profissional } = req.params;
    return ModelProfissional.findAll({
      where: { id_profissional: id_profissional },
      attributes: [],
      include: [
        {
          model: ModelProfissionalProfileImg,
          attributes: ["img_profile"],
          required: false,
        },
      ],
      group: ["tb_profissionalProfileImgs.id_profileImg"],
    });
  },

  queryPart3: async (req, res) => {
    const { id_profissional } = req.params;
    return ModelProfissional.findAll({
      where: { id_profissional: id_profissional },
      include: [
        {
          model: ModelConfirmacaoServico,
          attributes: [],
          include: [
            {
              model: ModelTerminoServico,
              attributes: [],
              include: [
                {
                  model: ModelAvaliacao,
                  attributes: [],
                  include: [
                    {
                      model: ModelTerminoServico,
                      attributes: [],
                      include: [
                        {
                          model: ModelConfirmacaoServico,
                          attributes: [],
                          include: [
                            {
                              model: ModelPostagemServico,
                              attributes: [],
                              include: [
                                {
                                  model: ModelCliente,
                                  attributes: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      attributes: [
        // Adicionando atributos do cliente
        [
          Sequelize.col(
            "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.id_cliente"
          ),
          "cliente_id",
        ],
        [
          Sequelize.col(
            "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.nm_cliente"
          ),
          "cliente_nome",
        ],
        [
          Sequelize.col(
            "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.img_cliente"
          ),
          "cliente_imagem",
        ],
        // Adicionando atributos da avaliação
        [
          Sequelize.col(
            "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.id_avaliacao"
          ),
          "avaliacao_id",
        ],
        [
          Sequelize.col(
            "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
          ),
          "avaliacao_numero",
        ],
        [
          Sequelize.col(
            "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.ds_comentario"
          ),
          "avaliacao_comentario",
        ],
      ],
      group: [
        "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.id_cliente",
        "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.id_avaliacao",
      ], // agrupando pelo id do cliente
    });
  },

  buscarfav: async (req, res) => {
    const { id_cliente, id_profissional, param } = req.params;

    if (param == false) {
      // Buscar sem criar ou destruir
      return ClienteProfissionalFavorito.findOne({
        where: {
          id_cliente: id_cliente,
          id_profissional: id_profissional,
        },
      });
    }
    const [alreadyFav, createdFav] =
      await ClienteProfissionalFavorito.findOrCreate({
        where: {
          id_cliente: id_cliente,
          id_profissional: id_profissional,
        },
      });

    if (!createdFav) {
      await ClienteProfissionalFavorito.destroy({
        where: {
          id_cliente: id_cliente,
          id_profissional: id_profissional,
        },
      });
    }
    return createdFav
      ? (createdFav.situacao = true)
      : (createdFav.situacao = null);
  },

  getfavs: async (req, res) => {
    const { id_cliente } = req.params;
    return ModelProfissional.findAll({
      include: [
        {
          model: ModelCliente,
          where: { id_cliente: id_cliente }, // A condição vai na tabela associada (Cliente)
          through: {
            attributes: [], // Não incluir atributos da tabela intermediária
          },
        },
      ],
    });
  },
  nservice: async (req, res) => {
    try {
      const { id_cliente } = req.params;
      const services = await ModelPostagemServico.count({
        where: {
          id_cliente: id_cliente,
        },
        include: [
          {
            model: ModelConfirmacaoServico,
            required: true,
            where: {
              id_confirmacaoServico: {
                [Op.notIn]: Sequelize.literal(
                  "(SELECT id_confirmacaoServico FROM tb_terminoServico)"
                ),
              },
            },
            include: [
              {
                model: ModelTerminoServico,
                required: false,
                where: {
                  id_terminoServico: {
                    [Op.is]: null,
                  },
                },
              },
            ],
          },
        ],
      });

      return services;
    } catch (err) {
      console.error(`Erro: ${err}`);
    }
  },

  Service: async (req, res) => {
    try {
      const { id_cliente } = req.params;
      const services = await ModelPostagemServico.findAll({
        where: { id_cliente: id_cliente },
        raw: true,
        include: [
          {
            model: ModelConfirmacaoServico,
            required: true,
            attributes: [],
            where: {
              id_confirmacaoServico: {
                [Op.notIn]: Sequelize.literal(
                  "(SELECT id_confirmacaoServico FROM tb_terminoServico)"
                ),
              },
            },
            include: [
              {
                model: ModelTerminoServico,
                required: false,
                where: {
                  id_terminoServico: {
                    [Op.is]: null, // Utilize null diretamente sem Op.is
                  },
                },
                attributes: [],
                include: [
                  {
                    model: ModelAvaliacao,
                    attributes: [],
                  },
                ],
              },
              {
                model: ModelProfissional,
                required: true,
                attributes: [],
              },
            ],
          },
        ],
        attributes: [
          [Sequelize.col("ds_servico"), "ds_servico"],
          [Sequelize.col("ds_titulo"), "ds_titulo"],
          [
            Sequelize.col("tb_confirmacaoServicos.dt_inicioServico"),
            "dt_inicioServico",
          ],
          [
            Sequelize.col("tb_confirmacaoServicos.id_confirmacaoServico"),
            "id_confirmacaoServico",
          ],
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn(
                "AVG",
                Sequelize.col(
                  "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
                )
              ),
              0
            ),
            "media_avaliacoes",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_profissional.id_profissional"
            ),
            "id_profissional",
          ],
          [
            Sequelize.col("tb_confirmacaoServicos.set_finalizar"),
            "set_finalizar",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_profissional.nm_profissional"
            ),
            "nm_profissional",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_profissional.img_profissional"
            ),
            "img_profissional",
          ],
        ],
        group: [
          "tb_postagemServico.id_postagemServico",
          "tb_confirmacaoServicos.id_confirmacaoServico",
          "tb_confirmacaoServicos.tb_profissional.id_profissional",
        ], //
      });

      return services;
    } catch (err) {
      console.error(`Erro de listagem: ${err}`);
    }
  },
  ServicePend: async (req, res) => {
    try {
      const { id_cliente } = req.params;
      const services = await ModelPostagemServico.findAll({
        where: {
          id_cliente: id_cliente,
          id_postagemServico: {
            [Op.notIn]: Sequelize.literal(
              "(SELECT id_postagemServico FROM tb_confirmacaoServico)"
            ),
          },
        },
        raw: true,
      });
      console.log("servicos pendentes", services);
      return services;
    } catch (err) {
      console.error(`Erro: ${err}`);
    }
  },
  Servicehistory: async (req, res) => {
    try {
      const { id_cliente } = req.params;
      const services = await ModelPostagemServico.findAll({
        where: { id_cliente: id_cliente },
        raw: true,
        
        include: [
          {
            model: ModelConfirmacaoServico,
            required: true,
            attributes: [],
            include: [
              {
                model: ModelTerminoServico,
                required: true,
                attributes: [],
                include: [
                  {
                    model: ModelAvaliacao,
                    attributes: [],
                  },
                ],
              },
              {
                model: ModelProfissional,
                required: true,
                attributes: [],
              },
            ],
          },
          {
            model: ModelCategoria,
            required: true,
            attributes: []
          }
        ],
        attributes: [
          [Sequelize.col("ds_servico"), "ds_servico"],
          [Sequelize.col("tb_categorium.ds_categoria"), "categoria"],
          [
            Sequelize.col("tb_confirmacaoServicos.dt_inicioServico"),
            "dt_inicioServico",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_terminoServico.dt_terminoServico"
            ),
            "dt_terminoServico",
          ],

          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn(
                "AVG",
                Sequelize.col(
                  "tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
                )
              ),
              0
            ),
            "media_avaliacoes",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_profissional.id_profissional"
            ),
            "id_profissional",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_profissional.nm_profissional"
            ),
            "nm_profissional",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServicos.tb_profissional.img_profissional"
            ),
            "img_profissional",
          ],
        ],
        group: [
          "tb_postagemServico.id_postagemServico",
          "tb_confirmacaoServicos.id_confirmacaoServico",
          "tb_confirmacaoServicos.tb_profissional.id_profissional",
        ], //
      });

      return services;
    } catch (err) {
      console.error(`Erro de listagem: ${err}`);
    }
  },
  apagarInfocliente: async (req, res) => {
    const { id_cliente } = req.params;
    return ModelCliente.destroy({
      where: {
        id_cliente: id_cliente,
      },
      raw: true,
    });
  },

  apagarService: async (req, res) => {
    const { id_cliente } = req.params;
    await ModelConfirmacaoServico.destroy({
      include: [
        {
          model: ModelPostagemServico,
          where: {
            id_cliente: id_cliente,
          },
          attributes: [],
        },
      ],
    });
  },
  apagarServicePend: async (req, res) => {
    const { id_cliente } = req.params;
    await ModelPostagemServico.destroy({
      where: { id_cliente: id_cliente },
      raw: true,
      include: [
        {
          model: ModelConfirmacaoServico,
          required: false,
          where: {
            id_confirmacaoServico: {
              [Op.is]: null, // Utilize null diretamente sem Op.is
            },
          },
        },
      ],
    });
  },
  apagarLocalcli: async (req, res) => {
    const { id_cliente } = req.params;
    await ModelEndereco.destroy({
      where: {
        id_cliente: id_cliente,
      },
    });
  },

  apagarfavoritoscliente: async (req, res) => {
    const { id_cliente } = req.params;
    await ClienteProfissionalFavorito.destroy({
      where: {
        id_cliente: id_cliente,
      },
    });
  },

  createTermino: async (req, res) => {
    const { id_confirmacaoServico, dt_terminoServico } = req.params;
    return await ModelTerminoServico.create({
      id_confirmacaoServico: id_confirmacaoServico,
      dt_terminoServico: dt_terminoServico,
    });
  },

  createAvaliacao: async (req, res) => {
    const { id_terminoservico, nmr_avaliacao, ds_comentario } = req.params;
    return await ModelAvaliacao.create({
      id_terminoservico: id_terminoservico,
      nmr_avaliacao: nmr_avaliacao,
      ds_comentario: ds_comentario,
    });
  },
};
