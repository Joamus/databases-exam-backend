const Sequelize = require('sequelize')
const { mysql } = require('../../config')

const userSchema = require('./models/user')
const citySchema = require('./models/city')
const purchaseSchema = require('./models/purchase')

const options = { 
  freezeTableName: true, 
  underscored: true
}



module.exports.db = new Sequelize(mysql.dbName, mysql.username, mysql.password, {
        host: mysql.host,
        dialect: mysql.dialect
      });

module.exports.authenticateDb = function() {
  module.exports.db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}


module.exports.initializeModels = function(callback) {

  let user = module.exports.db.define('user', userSchema, options)
  let city = module.exports.db.define('city', citySchema, options)
  let purchase = module.exports.db.define('purchase', purchaseSchema, options)
 
  makeTableAssociations(user, city, purchase)
  synchronizeModels(user, city, purchase)
  
  callback(user, city, purchase)

}

async function synchronizeModels(user, city, purchase) {
  await city.sync()
  await user.sync()
  await purchase.sync()
  console.log('purchase done')

}

function makeTableAssociations(user, city, purchase) {
  user.belongsTo(city)
  purchase.belongsTo(city)
  purchase.belongsTo(user)

}