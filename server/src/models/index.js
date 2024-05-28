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
const { ClienteProfissionalFavorito } = require('./fav')
const { ModelProfissionalProfileImg } = require('./profissionalProfileImg')
const {ModelProfissionalCategoria} = require("./profissionalCategoria")
const {ModelEnderecoProfissional} = require("./enderecoProfissional")

//um cliente tem muitas postagens e uma postagem tem um cliente
ModelCliente.hasMany(ModelPostagemServico, { foreignKey: 'id_cliente' });
ModelPostagemServico.belongsTo(ModelCliente, { foreignKey: 'id_cliente' });

//uma categoria tem muitas postagem e uma postagem tem uma categoria
ModelCategoria.hasMany(ModelPostagemServico, { foreignKey: 'id_categoria' });
ModelPostagemServico.belongsTo(ModelCategoria, { foreignKey: 'id_categoria' });

ModelProfissional.hasMany(ModelProfissionalProfileImg, {foreignKey:  'id_profissional'})
ModelProfissionalProfileImg.belongsTo(ModelProfissional, {foreignKey: 'id_profissional'})
//um endereço tem muitas postagens e uma postagem tem um endereço
ModelEndereco.hasMany(ModelPostagemServico, { foreignKey: 'id_endereco' });
ModelPostagemServico.belongsTo(ModelEndereco, { foreignKey: 'id_endereco' });

//um cliente tem muitos endereços e um endereço tem um cliente "acho q o cliente tem q ter apenas um ou dois endereços e poder altera-los"
ModelCliente.hasMany(ModelEndereco, { foreignKey: 'id_cliente' });
ModelEndereco.belongsTo(ModelCliente, { foreignKey: 'id_cliente' });

ModelProfissional.hasMany(ModelEnderecoProfissional, { foreignKey: 'id_profissional' })
ModelEnderecoProfissional.belongsTo(ModelProfissional, { foreignKey: 'id_profissional' })

//uma cidade tem muitos enderços e um enderço tem um tem apenas uma cidade
ModelCidade.hasMany(ModelEndereco, { foreignKey: 'id_cidade' });
ModelEndereco.belongsTo(ModelCidade, { foreignKey: 'id_cidade' });
// um profissional pode ter muitas categorias escolhidas
ModelProfissional.hasMany(ModelProfissionalCategoria, { foreignKey: 'id_profissional' });
ModelProfissionalCategoria.belongsTo(ModelProfissional, { foreignKey: 'id_profissional' });

// uma categoria pode estar em muitos profissionais
ModelCategoria.hasMany(ModelProfissionalCategoria, { foreignKey: 'id_categoria' });
ModelProfissionalCategoria.belongsTo(ModelCategoria, { foreignKey: 'id_categoria' });


// uma confirmação de serviço tem uma postagem e uma postagem tem uma confirmação  
ModelPostagemServico.hasOne(ModelConfirmacaoServico, { foreignKey: 'id_confirmacaoServico' });
ModelConfirmacaoServico.belongsTo(ModelPostagemServico, { foreignKey: 'id_confirmacaoServico' });


ModelCliente.belongsToMany(ModelProfissional, { through: ClienteProfissionalFavorito, foreignKey: 'id_cliente' });
ModelProfissional.belongsToMany(ModelCliente, { through: ClienteProfissionalFavorito, foreignKey: 'id_profissional' });


//as informaçôes de profissionais tem um profissional e um profissional tem uma informação de  profissional
ModelProfissional.hasOne(ModelInfoProfissional, { foreignKey: 'id_profissional' });
ModelInfoProfissional.belongsTo(ModelProfissional, { foreignKey: 'id_profissional' });

ModelProfissional.hasMany(ModelConfirmacaoServico, { foreignKey: 'id_profissional' });
ModelConfirmacaoServico.belongsTo(ModelProfissional, { foreignKey: 'id_profissional' });

//uma confirmação tem um termino de serviço tem uma confirmação e uma confirmação tem um termino
ModelConfirmacaoServico.hasOne(ModelTerminoServico, { foreignKey: 'id_confirmacaoServico' });
ModelTerminoServico.belongsTo(ModelConfirmacaoServico, { foreignKey: 'id_confirmacaoServico' });

ModelTerminoServico.hasOne(ModelAvaliacao, {foreignKey: 'id_terminoServico'})
ModelAvaliacao.belongsTo(ModelTerminoServico, {foreignKey: 'id_terminoServico'})


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
    ModelAvaliacao,
    ClienteProfissionalFavorito,
    ModelProfissionalProfileImg,
    ModelEnderecoProfissional,
    ModelProfissionalCategoria
};