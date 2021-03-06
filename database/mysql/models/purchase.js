const Sequelize = require('sequelize')

module.exports = {
    address: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    // The basket id will be a reference to a basket in the MongoDB, with the products
    basketId: {
        field: 'basket_id',
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true},
        
    willDeleteAt: {
        field: 'will_delete_at',
        type: Sequelize.DATE
    },
    grossAmount: {
        field: 'gross_amount',
        type: Sequelize.DECIMAL
    },
    netAmount: {
        field: 'net_amount',
        type: Sequelize.DECIMAL
    }
}