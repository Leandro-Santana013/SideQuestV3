
const { ModelCliente } = require('./cliente');
const { ModelProfissional } = require('./profissional');
const { ModelInfoProfissional } = require('./infoProfissional');
const { ModelEndereco } = require('./endereco');
const { ModelCategoria } = require('./categoria');
const { ModelCidade } = require('./cidade');
const { ModelPostagemServico } = require('./postagemServico');
const { ModelConfirmacaoServico } = require('./confirmacaoServico');
const { ModelTerminoServico } = require('./terminoServico');
const { ModelAvaliacao } = require('./avaliacao');

//um cliente tem muitas postagens e uma postagem tem um cliente
ModelCliente.hasMany(ModelPostagemServico, { foreignKey: 'id_cliente' });
ModelPostagemServico.belongsTo(ModelCliente, { foreignKey: 'id_cliente' });

//uma categoria tem muitas postagem e uma postagem tem uma categoria
ModelCategoria.hasMany(ModelPostagemServico, { foreignKey: 'id_categoria' });
ModelPostagemServico.belongsTo(ModelCategoria, { foreignKey: 'id_categoria' });

//um endereço tem muitas postagens e uma postagem tem um endereço
ModelEndereco.hasMany(ModelPostagemServico, { foreignKey: 'id_endereco' });
ModelPostagemServico.belongsTo(ModelEndereco, { foreignKey: 'id_endereco' });

//um cliente tem muitos endereços e um endereço tem um cliente "acho q o cliente tem q ter apenas um ou dois endereços e poder altera-los"
ModelCliente.hasMany(ModelEndereco, { foreignKey: 'id_cliente' });
ModelEndereco.belongsTo(ModelCliente, { foreignKey: 'id_cliente' });

//uma cidade tem muitos enderços e um enderço tem um tem apenas uma cidade
ModelCidade.hasMany(ModelEndereco, { foreignKey: 'id_cidade' });
ModelEndereco.belongsTo(ModelCidade, { foreignKey: 'id_cidade' });

// uma confirmação de serviço tem uma postagem e uma postagem tem uma confirmação  
ModelConfirmacaoServico.hasOne(ModelPostagemServico, { foreignKey: 'id_confirmacaoServico' });
ModelPostagemServico.belongsTo(ModelConfirmacaoServico, { foreignKey: 'id_confirmacaoServico' });

//uma avaliação de serviço tem um serviço terminado e um serviço terminado tem uma avaliação
ModelAvaliacao.hasOne(ModelTerminoServico, { foreignKey: 'id_avaliacao' });
ModelTerminoServico.belongsTo(ModelAvaliacao, { foreignKey: 'id_avaliacao' });

//as informaçôes de profissionais tem um profissional e um profissional tem uma informação de profissional
ModelInfoProfissional.hasOne(ModelProfissional, { foreignKey: 'id_infoProfissional' });
ModelProfissional.belongsTo(ModelInfoProfissional, { foreignKey: 'id_infoProfissional' });

//uma confirmação tem um termino de serviço tem uma confirmação e uma confirmação tem um termino
ModelConfirmacaoServico.hasOne(ModelTerminoServico, { foreignKey: 'id_confirmacaoServico' });
ModelTerminoServico.belongsTo(ModelConfirmacaoServico, { foreignKey: 'id_confirmacaoServico' });

module.exports = {
   ModelCliente,
    ModelProfissional,
    ModelInfoProfissional,
    ModelEndereco,
    ModelCategoria,
    ModelCidade,
    ModelPostagemServico,
    ModelConfirmacaoServico,
    ModelTerminoServico,
    ModelAvaliacao
};