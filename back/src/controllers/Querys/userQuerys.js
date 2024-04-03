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
} = require("../../models/index");

module.exports = {
  bindCookieBypkCliente: async (req, res) => {
    const { cd_emailCliente } = req.params;
    return ModelCliente.findOne({
      attributes: ["id_cliente", "cd_emailCliente"],
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
    const { id_cliente, cd_emailCliente } = req.params;
    return ModelCliente.findOne({
      where: {
        id_cliente: id_cliente,
        cd_emailCliente: cd_emailCliente
      },
      raw: true,
    });
  },

  //2
  selectCategorias: async (req, res) => {
    return ModelCategoria.findAll({
      attributes: ["ds_categoria"],
      order: [["ds_categoria", "ASC"]],
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
    const { ds_servico, ds_titulo, id_cliente, id_categoria, id_endereco } =
      req.params;
    return ModelPostagemServico.create({
      id_cliente: id_cliente,
      id_categoria: id_categoria,
      id_endereco: id_endereco,
      ds_servico: ds_servico,
      ds_titulo: ds_titulo,
    });
  },

  //6
  selectProfissional: async (req, res) => {
    try {
      const profissionais = await ModelProfissional.findAll({
        attributes: [
          "id_profissional",
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
        ],
        group: ["tb_profissional.id_profissional"],
      });

      return profissionais;
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      throw error;
    }
  },
};
