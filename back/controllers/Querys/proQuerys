const { ModelProfissional } = require('../../models/profissional')
const { Model, Op } = require('sequelize')
const { raw } = require("mysql2")

module.exports = {
    findEmailProfissional: async (req, res) => {
        const {  cd_emailtrabalhador } = req.params;
        return ModelProfissional.findAll({
            attributes: [' cd_emailtrabalhador', 'cd_senha'],
            where: {
                cd_emailtrabalhador:  cd_emailtrabalhador
            },
            raw: true
        });
    },
    findcpfProfissional: async (req, res) => {
        const { cd_cpftrabalhador } = req.params;
        return ModelCliente.findAll({
            attributes: ['cd_cpftrabalhador'],
            where: {
                cd_cpftrabalhador: cd_cpftrabalhador
            },
            raw: true
        });
    },
    insertProfissional: async (req, res) => {
        const { nm_trabalhador, cd_cpfCliente, cd_emailtrabalhador, cd_senha } = req.params; // Assumindo que o nome da marca está no corpo da requisição
        return ModelCliente.create({
            nm_trabalhador: nm_trabalhador,
            cd_emailtrabalhador: cd_emailtrabalhador,
            cd_cpfCliente: cd_cpfCliente,
            cd_senha: cd_senha
        });
    },
}