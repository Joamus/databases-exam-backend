const Sequelize = require('sequelize')

module.exports = {
        email: {
                type: Sequelize.STRING, 
                allowNull: false, 
                unique: true
        },
        password: {
                type: Sequelize.STRING, 
                allowNull: false
        },
        address: {
                type: Sequelize.STRING, 
                allowNull: false
        },
        role: {
                type: Sequelize.STRING, 
                allowNull: false, 
                defaultValue: '0'
        },
        firstName: {
                field: 'first_name', 
                type: Sequelize.STRING, 
                allowNull: false},
        lastName: { 
                field: 'last_name',
                type: Sequelize.STRING, 
                allowNull: false},
        willDeleteAt: {
                field: 'will_delete_at', 
                type: Sequelize.DATE
        }
}
