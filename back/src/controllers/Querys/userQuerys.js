const { Model, Op } = require('sequelize')
const { raw } = require("mysql2")
const { ModelCliente, ModelEndereco, ModelCategoria, ModelServico, ModelCidade } = require('../../models/index')

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
    },

    selectCategorias: async (req, res) => {
        return ModelCategoria.findAll({
            attributes: ['ds_categoria'],
            raw: true
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
    insertCidadeService: async (req, res) => {
        const { nm_cidade, sg_estado } = req.params
        return ModelCidade.create({  
            nm_cidade: nm_cidade,
            sg_estado: sg_estado,
        }
        )
    },

    CreateadressService: async (req, res) => {
        const { cd_cliente, nm_logradouro, cd_cep,  cd_cidade,  nm_bairro, nm_casa } = req.params
        return ModelEndereco.create({
            cd_cliente: cd_cliente,
            nm_logradouro: nm_logradouro,
            cd_cep: cd_cep,
            cd_cidade: cd_cidade,
            nm_bairro: nm_bairro,
            nm_casa: nm_casa,
        })
        
    },
    
    CreateServico: async (req, res) => {
        const {dt_inicio, dt_fim, ds_servico, vlr_servico, cd_cliente, cd_categoria, cd_endereco } = req.params
        return ModelServico.create({
            dt_inicio: dt_inicio,
            dt_fim: dt_fim,
            ds_servico: ds_servico,
            ds_servico: ds_servico,
            vlr_servico: vlr_servico,
            cd_cliente: cd_cliente,
            cd_endereco: cd_endereco,
        })
    }
}
