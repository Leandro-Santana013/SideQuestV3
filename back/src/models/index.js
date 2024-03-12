

const { ModelCliente } = require('./cliente');
const { ModelEndereco } = require('./endereco');
const { ModelCategoria } = require('./categoria');
const { ModelServico } = require('./servico');
const { ModelCidade } = require('./cidade');

ModelCliente.hasMany(ModelServico, { foreignKey: 'cd_cliente' });
ModelServico.belongsTo(ModelCliente, { foreignKey: 'cd_cliente' });

ModelCategoria.hasMany(ModelServico, { foreignKey: 'cd_categoria' });
ModelServico.belongsTo(ModelCategoria, { foreignKey: 'cd_categoria' });

ModelEndereco.hasMany(ModelServico, { foreignKey: 'cd_endereco' });
ModelServico.belongsTo(ModelEndereco, { foreignKey: 'cd_endereco' });

ModelCidade.hasMany(ModelEndereco, { foreignKey: 'cd_cidade' });
ModelEndereco.belongsTo(ModelCidade, { foreignKey: 'cd_cidade' });

module.exports = {
    ModelCliente,
    ModelEndereco,
    ModelCategoria,
    ModelServico,
    ModelCidade
};
