const Sequelize = require('sequelize')

module.exports = {
        first_name: { type: Sequelize.STRING, allowNull: false},
        last_name: { type: Sequelize.STRING, allowNull: false},
        deleted: { type: Sequelize.DATE,}
}
