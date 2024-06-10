const {
  ModelProfissional,
  ModelPostagemServico,
  ModelCliente,
  ModelCategoria,
  ModelProfissionalCategoria,
  ModelEnderecoProfissional,
  ModelConfirmacaoServico,
  ModelCidade,
  ModelInfoProfissional,
  ModelProfissionalProfileImg,
  ModelTerminoServico,
  ModelAvaliacao,
} = require("../../models/index");
const { Model, Op, Sequelize } = require("sequelize");
const { raw } = require("mysql2");
const { setarImg } = require("../proConstroller");

module.exports = {
  bindCookieBypkProfissonal: async (req, res) => {
    const { cd_emailProfissional } = req.params;
    return ModelProfissional.findOne({
      where: {
        cd_emailProfissional: cd_emailProfissional,
      },
    });
  },
  infoprofissional: async (req, res) => {
    const { id_profissional } = req.params;
    return ModelProfissional.findOne({
      where: {
        id_profissional: id_profissional,
      },
      raw: true,
    });
  },
  findEmailProfissional: async (req, res) => {
    const { cd_emailProfissional } = req.params;
    return ModelProfissional.findAll({
      attributes: ["cd_emailProfissional"],
      where: {
        cd_emailProfissional: cd_emailProfissional,
      },
    });
  },
  findcpfProfissional: async (req, res) => {
    const { cd_cpfProfissional } = req.params;
    return ModelProfissional.findAll({
      attributes: ["cd_cpfProfissional"],
      where: {
        cd_cpfProfissional: cd_cpfProfissional,
      },
    });
  },
  insertProfissional: async (req, res) => {
    const {
      nm_profissional,
      cd_cpfProfissional,
      cd_emailProfissional,
      cd_senhaProfissional,
    } = req.params; // Assumindo que o nome da marca está no corpo da requisição
    return ModelProfissional.create({
      nm_profissional: nm_profissional,
      cd_emailProfissional: cd_emailProfissional,
      cd_cpfProfissional: cd_cpfProfissional,
      cd_senhaProfissional: cd_senhaProfissional,
    });
  },

  findEmailProfissional: async (req, res) => {
    const { cd_emailProfissional } = req.params;
    return ModelProfissional.findAll({
      attributes: ["cd_emailProfissional", "cd_senhaProfissional"],
      where: {
        cd_emailProfissional: cd_emailProfissional,
      },
    });
  },

  findtokenProfissional: async (req, res) => {
    try {
      const { cd_emailProfissional } = req.params;
      const cliente = await ModelProfissional.findOne({
        attributes: ["cd_tokenProfissional"],
        where: {
          cd_emailProfissional: cd_emailProfissional,
        },
      });
      console.log("Profissional encontrado:", cliente);
      return cliente ? cliente.cd_tokenProfissional : null;
    } catch (error) {
      console.error("Erro ao buscar token por email:", error);
      // Lide com o erro de alguma forma apropriada para sua aplicação
      throw error;
    }
  },

  updateTokenByEmail: async (req, res) => {
    const { cd_emailProfissional, cd_tokenProfissional } = req.params;
    return ModelProfissional.update(
      { cd_tokenProfissional: cd_tokenProfissional },
      { where: { cd_emailProfissional: cd_emailProfissional } }
    );
  },

  findServices: async (req, res) => {
    try {
      const { id_profissional } = req.params;
      const services = await ModelPostagemServico.findAll({
        include: [
          {
            model: ModelCliente,
            required: true,
            attributes: [
              ["nm_cliente", "nm_cliente"],
              ["img_cliente", "img_cliente"],
            ],
          },
          {
            model: ModelCategoria,
            required: true,
            attributes: [["ds_categoria", "ds_categoria"]],
          },
        ],
        where: {
          id_postagemServico: {
            [Op.notIn]: Sequelize.literal(
              "(SELECT id_postagemServico FROM tb_confirmacaoServico)"
            ),
          },
          id_categoria: {
            [Op.in]: Sequelize.literal(
              `(SELECT id_categoria FROM tb_profissional_categoria WHERE id_profissional = ${id_profissional})`
            ),
          },
          pr_escolhido: {
            [Op.is]: null,
          },
        },
        order: [[Sequelize.literal("id_postagemServico"), "DESC"]],
        raw: true,
      });
      return services;
    } catch (err) {
      console.error(`Erro: ${err}`);
    }
  },

  findService: async (req, res) => {
    const { id_postagemServico } = req.params;
    try {
      return ModelPostagemServico.findOne({
        where: {
          id_postagemServico: {
            [Op.notIn]: Sequelize.literal(
              `(SELECT id_postagemServico FROM tb_confirmacaoServico)`
            ),
          },
          id_postagemServico: id_postagemServico,
        },
        include: [
          {
            model: ModelCliente,
            required: true,
            raw: true,
            attributes: [],
          },
          {
            model: ModelCategoria,
            required: true,
            raw: true,
            attributes: [],
          },
        ],
        attributes: [
          "ds_servico",
          "id_postagemServico",
          "ds_titulo",
          "img_servico",
          "tm_postagem",
          "pr_escolhido",
          [Sequelize.col("tb_cliente.nm_cliente"), "nm_cliente"],
          [Sequelize.col("tb_cliente.img_cliente"), "img_cliente"],
          [Sequelize.col("tb_categorium.ds_categoria"), "ds_categoria"],
        ],
        raw: true,
      });
    } catch (err) {
      console.error(`Erro: ${err}`);
    }
  },

  selectallUsers: async (req, res) => {
    return ModelCliente.findAll({
      raw: true,
    });
  },

  selectInfoCliente: async (req, res) => {
    const { id_cliente } = req.params;
    return ModelCliente.findOne({
      where: {
        id_cliente: id_cliente,
      },
      raw: true,
    });
  },

  updateInfoPro: async (req, res) => {
    const {
      id_profissional,
      nm_profissional,
      cd_emailProfissional,
      img_profissional,
    } = req.params;
    return ModelProfissional.update(
      {
        nm_cliente: nm_profissional,
        cd_emailCliente: cd_emailProfissional,
        img_profissional: img_profissional,
      },
      { where: { id_profissional: id_profissional } }
    );
  },

  updatePro: async (req, res) => {
    const {
      id_profissional,
      nmr_telefoneProfissional,
      sg_sexoProfissional,
      qt_idadeProfissional,
    } = req.params;
    return ModelProfissional.update(
      {
        nmr_telefoneProfissional: nmr_telefoneProfissional,
        sg_sexoProfissional: sg_sexoProfissional,
        qt_idadeProfissional: qt_idadeProfissional,
      },
      { where: { id_profissional: id_profissional } }
    );
  },

  //não terminado
  createinfopro: async (req, res) => {
    const { id_profissional, ds_biografia } = req.params;
    return ModelInfoProfissional.create({
      id_profissional: id_profissional,
      ds_biografia: ds_biografia,
    });
  },
  selectCat: async (req, res) => {
    const { ds_categoria } = req.params;
    return ModelCategoria.findAll({
      attributes: ["id_categoria"],
      where: { ds_categoria: ds_categoria },
      raw: true,
    });
  },
  createcatPro: async (req, res) => {
    const { id_profissional, id_categoria } = req.params;
    return ModelProfissionalCategoria.create({
      id_profissional: id_profissional,
      id_categoria: id_categoria,
      raw: true,
    });
  },
  createadresspro: async (req, res) => {
    const {
      id_profissional,
      nm_logradouro,
      cd_cep,
      id_cidade,
      nm_bairro,
      nmr_casa,
      end_principal,
      txt_complemento,
    } = req.params;
    try {
      return ModelEnderecoProfissional.create({
        id_profissional: id_profissional,
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

  findServicesPrivate: async (req, res) => {
    try {
      const { id_profissional } = req.params;
      const services = await ModelPostagemServico.findAll({
        include: [
          {
            model: ModelCliente,
            required: true,
            attributes: [
              ["nm_cliente", "nm_cliente"],
              ["img_cliente", "img_cliente"],
            ],
          },
          {
            model: ModelCategoria,
            required: true,
            attributes: [["ds_categoria", "ds_categoria"]],
          },
        ],
        where: {
          id_postagemServico: {
            [Op.notIn]: Sequelize.literal(
              "(SELECT id_postagemServico FROM tb_confirmacaoServico)"
            ),
          },
          pr_escolhido: id_profissional,
        },
        order: [[Sequelize.literal("id_postagemServico"), "DESC"]],
        raw: true,
      });
      return services;
    } catch (err) {
      console.error(`Erro: ${err}`);
    }
  },
  insertconfirmarServico: async (req, res) => {
    const { id_profissional, id_postagemServico, dt_inicioServico } =
      req.params;
    return ModelConfirmacaoServico.create({
      id_profissional: id_profissional,
      id_postagemServico: id_postagemServico,
      dt_inicioServico: dt_inicioServico,
    });
  },

  setarImg: async (req, res) => {
    const { id_profissional, Img_profile } = req.params;
    return ModelProfissionalProfileImg.create({
      id_profissional: id_profissional,
      Img_profile: Img_profile,
    });
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
        ],
        attributes: [
          [Sequelize.col("ds_servico"), "ds_servico"],
          [
            Sequelize.col("tb_confirmacaoServico.dt_inicioServico"),
            "dt_inicioServico",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServico.tb_terminoServico.dt_terminoServico"
            ),
            "dt_terminoServico",
          ],

          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn(
                "AVG",
                Sequelize.col(
                  "tb_confirmacaoServico.tb_terminoServico.tb_avaliacao.nmr_avaliacao"
                )
              ),
              0
            ),
            "media_avaliacoes",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServico.tb_profissional.id_profissional"
            ),
            "id_profissional",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServico.tb_profissional.nm_profissional"
            ),
            "nm_profissional",
          ],
          [
            Sequelize.col(
              "tb_confirmacaoServico.tb_profissional.img_profissional"
            ),
            "img_profissional",
          ],
        ],
        group: [
          "tb_postagemServico.id_postagemServico",
          "tb_confirmacaoServico.id_confirmacaoServico",
          "tb_confirmacaoServico.tb_profissional.id_profissional",
        ], //
      });

      return services;
    } catch (err) {
      console.error(`Erro de listagem: ${err}`);
    }
  },

  Service: async (req, res) => {
    try {
      const { id_profissional } = req.params;
      const services = await ModelConfirmacaoServico.findAll({
        raw: true,
        where: { id_profissional: id_profissional,
          id_confirmacaoServico: {
            [Op.notIn]: Sequelize.literal(
              "(SELECT id_confirmacaoServico FROM tb_terminoServico)"
            ),
          },
        },
        include: [
          {
            model: ModelPostagemServico,
            required: true,
            attributes: [],
            include: [
              {
                model: ModelCliente,
                required: true,
                attributes: [],
              },
            ],
          },
          {
            model: ModelProfissional,
            required: true,
            attributes: [],
            where: { id_profissional: id_profissional },
          },
        ],
        attributes: [
          [Sequelize.col("tb_postagemServico.ds_servico"), "ds_servico"],
          [Sequelize.col("tb_postagemServico.ds_servico"), "ds_servico"],
          [Sequelize.col("tb_postagemServico.ds_titulo"), "ds_titulo"],
          [Sequelize.col("tb_postagemServico.tb_cliente.nm_cliente"), "nm_cliente"],
          [Sequelize.col("tb_postagemServico.tb_cliente.img_cliente"), "img_cliente"],
          [Sequelize.col("dt_inicioServico"), "dt_inicioServico"],
          [Sequelize.col("set_finalizar"), "set_finalizar"],
          [Sequelize.col("id_confirmacaoServico"), "id_confirmacaoServico"],
        ],
        group: [
          "tb_confirmacaoServico.id_confirmacaoServico",
          "tb_postagemServico.id_postagemServico",
          "tb_profissional.id_profissional",
          "tb_postagemServico.tb_cliente.id_cliente",
        ], //
      });

      return services;
    } catch (err) {
      console.error(`Erro de listagem: ${err}`);
    }
  },

    
  nservice: async (req, res) => {
    try {
      const { id_profissional } = req.params;
      const services = await ModelPostagemServico.count({
        include: [
          {
            model: ModelConfirmacaoServico,
            required: true,
            where: {
              id_profissional: id_profissional,
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
  Servicehistory: async (req, res) => {
    try {
      const { id_profissional } = req.params;
      const services = await ModelPostagemServico.findAll({
        raw: true,
        include: [
          {
            model: ModelCliente,
            required: true,
            attributes: [],
          },
          {
            model: ModelCategoria,
            required: true,
            attributes: []
          },
          {
            model: ModelConfirmacaoServico,
            required: true,
            attributes: [],
            where: { id_profissional: id_profissional },
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
            ],
          },
        ],
        attributes: [
          "tb_confirmacaoServicos.id_confirmacaoServico",
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
          [Sequelize.col("tb_cliente.id_cliente"), "id_cliente"],
          [Sequelize.col("tb_cliente.nm_cliente"), "nm_cliente"],
          [Sequelize.col("tb_cliente.img_cliente"), "img_cliente"],
        ],
        group: [
          "tb_confirmacaoServicos.id_confirmacaoServico",
          "tb_cliente.id_cliente",
        ], //
      });

      return services;
    } catch (err) {
      console.error(`Erro de aaa listagem: ${err}`);
    }
  },

  updateService: async (req, res) => {
    try {
      const { id_confirmacaoServico } = req.params;
      return await ModelConfirmacaoServico.update(
        { set_finalizar: true },
        { where: { id_confirmacaoServico: id_confirmacaoServico } }
      );
    } catch (erro) {
      console.log(erro);
    }
  },
};
