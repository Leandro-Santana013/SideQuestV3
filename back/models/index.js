const Cliente = require('./cliente')
const endereco = require('./endereco')
const categoria = require('./categoria')
const servico = require('./servico')
const cidade = require('./cidade')

Cliente.hasmany(servico, { foreignKey: 'cd_clinte' })
servico.belongTo(Cliente, { foreignKey: 'cd_cliente' })

categoria.hasmany(servico, { foreignKey: 'cd_categoria' })
servico.belongsTo(categoria, { foreignKey: ' cd_categoria' })

endereco.hasmany(servico, { foreignKey: 'endereço' })
servico.belongTo(endereco, { foreignKey: 'endereço' })

//cidade 
cidade.hasmany(endereco, { foreignKey: 'cd_endereco' })
endereco.belongTo(cidade, { foreignKey: 'cd_endereco' })

module.exports = {
    Cliente,
    endereco,
    categoria,
    servico,
    cidade
}
