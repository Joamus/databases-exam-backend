const Sequelize = require('sequelize')
const { mysql } = require('../../config')

module.exports.options = { 
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


