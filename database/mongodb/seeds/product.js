const Product = require('../models/product')

module.exports.seed = function(db) {
    db.collection('product').insertMany([
        new Product("Settlers from Catan", "A board game about bargaining, exploring, and fierce rivalry", 250, 30),
        new Product("Spyfall", "Ever wanted to be James Bond, but you don't like martinis and violence? You prefer lying to your friends? Play spyfall then!", 301.50, 12),
        new Product("Monopoly", "Do you love capitalism? Do you also want to ruin your family? Play this game, or communism will win", 450.99, 38),
        new Product("Cluedo", "Who killed the landlord? The butcher? The butler? The bambi? Who knows! What a mystery...", 666, 83),
        new Product("Ludo", "A game about skill", 125, 10)
    ])
    .then((result) => {
        console.log("[MongoDB] Products seeded ...")

    })
    .catch((err, result) => {
        console.log("[MongoDB] Product seeding failed, products probably already exist ...")

    })

}