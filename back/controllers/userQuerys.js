const { ModelCliente } = require('../models/cliente')
const { Model, Op } = require('sequelize')
const { raw } = require("mysql2")

module.exports = {
    findEmailCliente: async (req, res) => {
        const { cd_emailCliente, } = req.params;
        return ModelCliente.findAll({
            attributes: ['cd_emailCliente', 'cd_senha'],
            where: {
                cd_emailCliente: cd_emailCliente
            },
            raw: true
        });
    },
    findcpfCliente: async (req, res) => {
        const { cd_cpfCliente } = req.params;
        return ModelCliente.findAll({
            attributes: ['cd_cpfCliente'],
            where: {
                cd_cpfCliente: cd_cpfCliente
            },
            raw: true
        });
    },

    insertClient: async (req, res) => {
        const { nm_cliente, cd_cpfCliente, cd_emailCliente, cd_senha } = req.params; // Assumindo que o nome da marca está no corpo da requisição
        return ModelCliente.create({
            nm_cliente: nm_cliente,
            cd_emailCliente: cd_emailCliente,
            cd_cpfCliente: cd_cpfCliente,
            cd_senha: cd_senha
        });
    },
    findtokenCliente: async (req, res) => {
        try {
            const { cd_emailCliente } = req.params;
            const cliente = await ModelCliente.findOne({
                attributes: ['cd_token'],
                where: {
                    cd_emailCliente: cd_emailCliente
                },
                raw: true
            });

            return cliente ? cliente.cd_token : null;

        } catch (error) {
            console.error('Erro ao buscar token por email:', error);
            // Lide com o erro de alguma forma apropriada para sua aplicação
            throw error;
        }
    },
    updateTokenByEmail: async (req, res) => {
        const { cd_emailCliente, cd_token } = req.params;
        return ModelCliente.update(
            { cd_token: cd_token },
            { where: { cd_emailCliente: cd_emailCliente } }
        );

    }
}