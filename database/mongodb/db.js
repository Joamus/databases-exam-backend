const MongoClient = require('mongodb').MongoClient
const { mongodb } = require('../../config')


module.exports.getDb = function(callback) {

    MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        console.log("MongoDB connected...");
        callback(err, db)
      });

}
