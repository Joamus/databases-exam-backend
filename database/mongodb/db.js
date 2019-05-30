const MongoClient = require('mongodb').MongoClient
const { mongodb } = require('../../config')

const basketSeed = require('./seeds/basket')
const productSeed = require('./seeds/product')


module.exports.getDb = function(callback) {

    MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        console.log("[MongoDB] Connected ...");
        const connection = client.db(mongodb.db)

        createIndexes(connection)
        seedDb(connection)
        callback(err, connection)
      });

}

function createIndexes(db) {
  db.collection('products').createIndex({name: "text"}, {unique: true})

}

function seedDb(db) {
  productSeed.seed(db)

}
