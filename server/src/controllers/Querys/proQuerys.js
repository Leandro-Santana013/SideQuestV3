const {
  ModelProfissional,
  ModelPostagemServico,
  ModelCliente,
  ModelCategoria,
  ModelProfissionalCategoria,
  ModelEnderecoProfissional
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
    },

    updateInfoPro: async (req, res) => {
      const { id_profissional, nm_profissional, cd_emailProfissional, img_profissional } = req.params;
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
      const { id_profissional, nmr_telefoneProfissional, sg_sexoProfissional, qt_idadeProfissional } = req.params;
      return ModelProfissional.update(
        {
          nmr_telefoneProfissional:nmr_telefoneProfissional,
          sg_sexoProfissional:sg_sexoProfissional,
          qt_idadeProfissional: qt_idadeProfissional
        }, 
        { where: { id_profissional: id_profissional } }
      );
    },
    selectCat: async (req, res) => {
      const {ds_categoria} = req.params
      return ModelCategoria.findAll({
        attributes: ["id_categoria"],
        where:{ds_categoria: ds_categoria}
      })
    },
    createcatPro: async (req, res) => {
      const {id_profissional, ds_categoria} = req.params
      return ModelProfissionalCategoria.create({
        id_profissional:id_profissional,
        ds_categoria:ds_categoria
      })
    },
    createadresspro: async (req, res) => {
      const {
        id_profissional,
        nm_logradouro,
        cd_cep,
        id_cidade,
        nm_bairro,
        nmr_casa,
        end_principal
      } = req.params;
      try {
        return ModelEnderecoProfissional.create({
          id_profissional: id_profissional,
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


};
