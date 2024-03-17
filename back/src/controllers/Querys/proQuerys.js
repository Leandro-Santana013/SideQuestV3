const { ModelProfissional } = require('../../models/index')
const { Model, Op } = require('sequelize')
const { raw } = require("mysql2")

module.exports = {
    findEmailProfissional: async (req, res) => {
        const { cd_emailProfissional } = req.params;
        return ModelProfissional.findAll({
            attributes: ['cd_emailProfissional'],
            where: {
                cd_emailProfissional : cd_emailProfissional
            },
        });
    },
    findcpfProfissional: async (req, res) => {
        const { cd_cpfProfissional } = req.params;
        return ModelProfissional.findAll({
            attributes: ['cd_cpfProfissional'],
            where: {
                cd_cpfProfissional: cd_cpfProfissional
            },

        });
    },
    insertProfissional: async (req, res) => {
        const { nm_profissional, cd_cpfProfissional, cd_emailProfissional, cd_senhaProfissional } = req.params; // Assumindo que o nome da marca está no corpo da requisição
        return ModelProfissional.create({
            nm_profissional: nm_profissional,
            cd_emailProfissional : cd_emailProfissional,
            cd_cpfProfissional: cd_cpfProfissional,
            cd_senhaProfissional: cd_senhaProfissional
        });
    },
}