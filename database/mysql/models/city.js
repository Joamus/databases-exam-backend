const Sequelize = require('sequelize')

module.exports = {
    postal_code: { primaryKey: true, type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false }

}