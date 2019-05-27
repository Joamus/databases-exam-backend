const Sequelize = require('sequelize')

module.exports = {
        email: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: false},
        address: {type: Sequelize.STRING, allowNull: false},
        role: {type: Sequelize.STRING, allowNull: false, defaultValue: '0'},
        first_name: { type: Sequelize.STRING, allowNull: false},
        last_name: { type: Sequelize.STRING, allowNull: false},
        will_delete_at: { type: Sequelize.DATE}
}
