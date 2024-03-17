const { Model, Op } = require('sequelize')
const { raw } = require("mysql2")
const { ModelCliente,
    ModelProfissional,
    ModelEndereco,
    ModelCategoria,
    ModelCidade,
    ModelPostagemServico,
    ModelConfirmacaoServico,
    ModelTerminoServico,
    ModelAvaliacao } = require('../../models/index');

module.exports = {
    bindCookieBypkCliente: async  (req, res) => {
        const { cd_cpfCliente } = req.params;
       return ModelCliente.findOne({
        attributes: ['id_cliente'],
        where:{
            cd_cpfCliente:cd_cpfCliente
        }
     })
    },

    findEmailCliente: async (req, res) => {
        const { cd_emailCliente, } = req.params;
        return ModelCliente.findAll({
            attributes: ['cd_emailCliente', 'cd_senhaCliente'],
            where: {
                cd_emailCliente: cd_emailCliente
            },
        });
    },
    findcpfCliente: async (req, res) => {
        const { cd_cpfCliente } = req.params;
        return ModelCliente.findAll({
            attributes: ['cd_cpfCliente'],
            where: {
                cd_cpfCliente: cd_cpfCliente
            },
        });
    },

    insertClient: async (req, res) => {
        const { nm_cliente, cd_cpfCliente, cd_emailCliente, cd_senhaCliente } = req.params; // Assumindo que o nome da marca está no corpo da requisição
        return ModelCliente.create({
            nm_cliente: nm_cliente,
            cd_emailCliente: cd_emailCliente,
            cd_cpfCliente: cd_cpfCliente,
            cd_senhaCliente: cd_senhaCliente
        });
    },
    findtokenCliente: async (req, res) => {
        try {
            const { cd_emailCliente } = req.params;
            const cliente = await ModelCliente.findOne({
                attributes: ['cd_tokenCliente'],
                where: {
                    cd_emailCliente: cd_emailCliente
                },
            });
            console.log("Cliente encontrado:", cliente);
            return cliente ? cliente.cd_tokenCliente : null;

        } catch (error) {
            console.error('Erro ao buscar token por email:', error);
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

    selectCategorias: async (req, res) => {
        return ModelCategoria.findAll({
            attributes: ['ds_categoria'],
        });
    },
    selectCategoriaescolhida: async (req, res) => {
        const { ds_categoria } = req.params
        return ModelCategoria.findOne({
            where: {
                ds_categoria: ds_categoria
            },
            raw: true
        });
    },
    selectCidadeAdress: async (req, res) => {
        const { nm_cidade, sg_estado } = req.params
        return ModelCidade.findOne({
            attributes: ['id_cidade'],
            where: {
                nm_cidade: nm_cidade,
                sg_estado: sg_estado
            },
            raw: true
        })
    },
    findCdCliente: async (req, res) => {
        const { cd_cpfCliente } = req.params;
        return ModelCliente.findOne({
            attributes: ['id_cliente'],
            where: {
                cd_cpfCliente: cd_cpfCliente
            },
            raw: true
        });
    },

    CreateadressService: async (req, res) => {
        const { id_cliente, nm_logradouro, cd_cep, id_cidade, nm_bairro, nmr_casa } = req.params;
        try {
            const [enderecoInstance, created] = await ModelEndereco.findOrCreate({
                where: {
                    id_cliente: id_cliente,
                    id_cidade: id_cidade,
                    nm_logradouro: nm_logradouro,
                    cd_cep: cd_cep,
                    nm_bairro: nm_bairro,
                    nmr_casa: nmr_casa,
                }
            });
            return enderecoInstance;
        } catch (error) {
            console.error('Erro ao criar ou encontrar endereço:', error);
            throw error;
        }
    },


    CreateServico: async (req, res) => {
        const { ds_servico, id_cliente, id_categoria, id_endereco } = req.params
        return ModelPostagemServico.create({
            id_cliente: id_cliente,
            id_categoria: id_categoria,
            id_endereco: id_endereco,
            ds_servico: ds_servico,
        })
    }
}
