const MongoClient = require('mongodb').MongoClient
const { mongodb } = require('../../config')


module.exports.getDb = function(callback) {

    MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        console.log("MongoDB connected...");

        const examDb = client.db(mongodb.db)
        callback(err, examDb)
      });

}
