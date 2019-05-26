const Sequelize = require('sequelize')

module.exports = {
    address: {type: Sequelize.STRING, allowNull: false},
    // The basket id will be a reference to a basket in the MongoDB, with the products
    basket_id: {type: Sequelize.STRING, allowNull: false},
}