function _padraoTableDBExistence(typedTableNm) {
    return {
        timestamps: false,
        freezeTableName: true,
        tableName: typedTableNm
    }
}

module.exports = {_padraoTableDBExistence}