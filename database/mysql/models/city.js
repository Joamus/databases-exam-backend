const Sequelize = require('sequelize')

module.exports = {
    postal_code: { primaryKey: true, type: Sequelize.STRING, allowNull: false, unique: true },
    name: { type: Sequelize.STRING, allowNull: false }

}


