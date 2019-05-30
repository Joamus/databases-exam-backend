const Product = require('../models/product')
const dummyProducts = require('./dummy_products')

module.exports.seed = function(db) {
    db.collection('products').insertMany(dummyProducts)

    .then((result) => {
        console.log("[MongoDB] Products seeded ...")

    })
    .catch((err, result) => {
        console.log("[MongoDB] Product seeding failed, products probably already exist ...")

    })

}