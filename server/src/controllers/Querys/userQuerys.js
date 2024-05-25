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
  ModelProfissionalProfileImg
} = require("../../models/index");

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
    const { nm_cidade, sg_estado } = req.params;
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
      tm_postagem
    } = req.params;
    return ModelPostagemServico.create({
      id_cliente: id_cliente,
      id_categoria: id_categoria,
      id_endereco: id_endereco,
      ds_servico: ds_servico,
      ds_titulo: ds_titulo,
      img_servico: img_servico,
      tm_postagem: tm_postagem
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
            attributes: ['id_categoria'],
            include: [
              {
                model: ModelCategoria,
                attributes: ['ds_categoria'],
              },
            ],
          },
        ],
        group: ["tb_profissional.id_profissional", "tb_profissional_categoria.tb_categorium.id_categoria", "tb_profissional_categoria.id_categoriaEscolhida"],
      });
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      res.status(500).send("Erro ao buscar profissionais");
    }
  },
  




  updateInfoCli: async (req, res) => {
    const { id_cliente, nm_cliente, cd_emailCliente, img_cliente } = req.params;
    return ModelCliente.update(
      {
        nm_cliente: nm_cliente,
        cd_emailCliente: cd_emailCliente,
        img_cliente: img_cliente,
      },
      { where: { id_cliente: id_cliente } }
    );
  },


  updateInfoCliente: async (req, res) => {
    const { id_cliente, qt_idadeCliente, sg_sexoCliente, nmr_telefoneCliente } = req.params;
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
      end_principal
    } = req.params;
    try {
      return ModelEndereco.create({
        id_cliente: id_cliente,
        id_cidade: id_cidade,
        nm_logradouro: nm_logradouro,
        cd_cep: cd_cep,
        nm_bairro: nm_bairro,
        nmr_casa: nmr_casa,
        end_principal: end_principal
      });
    } catch (error) {
      console.error("Erro ao criar ou encontrar endereço:", error);
      throw error;
    }
  },

  selectLocalcli: async (req, res) => {
    const { id_cliente, end_principal } = req.params;
    return ModelEndereco.findOne({
      where: {
        id_cliente: id_cliente,
        end_principal: end_principal
      },
      raw: true
    })
  },

  queryPart1: async (req, res) => {
    const { id_profissional } = req.params
    return ModelProfissional.findAll({
      where: { id_profissional: id_profissional },
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
                                  attributes: []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      attributes: [
        'id_profissional',
        'sg_sexoProfissional',
        'img_profissional',
        'nm_profissional',
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
      group: ['tb_profissional.id_profissional'] // Inclua todas as colunas não agregadas na cláusula GROUP BY
    });
  },
  queryPart2: async (req, res) => {
    const { id_profissional } = req.params
    return ModelProfissional.findAll({
      where: { id_profissional: id_profissional },
      include: [
        {
          model: ModelProfissionalProfileImg,
          attributes: [],
          required:false
        },
      ],
      attributes: [  
        [Sequelize.fn('COALESCE', Sequelize.col("tb_profissionalProfileImgs.img_profile"), null), "img_profile"],
    ],
    group: ["tb_profissionalProfileImgs.img_profile"]
    })
  },

  queryPart3: async (req, res) => {
    const { id_profissional } = req.params
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
                                  attributes: []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      attributes: [
        // Adicionando atributos do cliente
        [Sequelize.col("tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.id_cliente"), "cliente_id"],
        [Sequelize.col("tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.nm_cliente"), "cliente_nome"],
        [Sequelize.col("tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.img_cliente"), "cliente_imagem"],
        // Adicionando atributos da avaliação
        [Sequelize.col("tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.id_avaliacao"), "avaliacao_id"],
        [Sequelize.col("tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.nmr_avaliacao"), "avaliacao_numero"],
        [Sequelize.col("tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.ds_comentario"), "avaliacao_comentario"],
      ],
      group: ['tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.tb_terminoServico.tb_confirmacaoServico.tb_postagemServico.tb_cliente.id_cliente',
        'tb_confirmacaoServicos.tb_terminoServico.tb_avaliacao.id_avaliacao',
      ] // agrupando pelo id do cliente
    });
  }




}

