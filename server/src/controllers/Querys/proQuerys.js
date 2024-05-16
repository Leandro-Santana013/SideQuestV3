const {
  ModelProfissional,
  ModelPostagemServico,
  ModelCliente
} = require("../../models/index");
const { Model, Op, Sequelize } = require("sequelize");
const { raw } = require("mysql2");

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
      raw:true
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
        return ModelPostagemServico.findAll({
            where: {
                id_postagemServico: {
                    [Op.notIn]: Sequelize.literal(
                        `(SELECT id_postagemServico FROM tb_confirmacaoServico)`
                    )
                }
            },
            include: [{
                model: ModelCliente,
                required: true,
                raw: true,
                attributes: [
                    ["nm_cliente", "nm_cliente"],
                    ["img_cliente", "img_cliente"]
                ]
            }],
            order: [[Sequelize.literal('id_postagemServico'), 'DESC']],
            raw: true
        });
        
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
                  )
              },
            id_postagemServico : id_postagemServico

          },
          include: [{
              model: ModelCliente,
              required: true,
              raw: true,
              attributes: [
                  ["nm_cliente", "nm_cliente"],
                  ["img_cliente", "img_cliente"]
              ]
          }],
          raw: true
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
    }
};
