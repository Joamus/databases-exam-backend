const Sequelize = require('sequelize')
const { mysql } = require('../../config')

const axios = require('axios')

const userSchema = require('./models/user')
const citySchema = require('./models/city')
const purchaseSchema = require('./models/purchase')

const userSeed = require('./seeds/user')
const purchaseSeed = require('./seeds/purchase')


// I module.export everything at the bottom
let user
let city
let purchase

const options = { 
  freezeTableName: true, 
  underscored: true,
}

db = new Sequelize(mysql.dbName, mysql.username, mysql.password, {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  host: mysql.host,
  dialect: mysql.dialect,
  logging: false,
});



async function authenticateDb(callback) {
  db.authenticate()
  .then(() => {
    console.log('[MySQL] Connected ...');
    callback()
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

function initialize (callback) {
  authenticateDb(() => {
    user = db.define('user', userSchema, options)
    city = db.define('city', citySchema, options)
    purchase = db.define('purchase', purchaseSchema, options)
      makeTableAssociations(user, city, purchase)
      synchronizeModels(user, city, purchase)
      getCities(city, () => {
        seedTables(user, purchase)

        let models = {
          user, city, purchase
        }
        callback(models)
      })

  })
  
}

async function synchronizeModels(user, city, purchase) {
  await city.sync()
  await user.sync()
  await purchase.sync()
  console.log('[MYSQL] Tables synchronized ...')

}

async function seedTables(user, purchase) {
  await userSeed.seed(user)
  await purchaseSeed.seed(purchase)
  
}

function makeTableAssociations(user, city, purchase) {
  user.belongsTo(city)
  purchase.belongsTo(city)
  purchase.belongsTo(user)

}

async function getCities(city, callback) {
  axios.get('https://dawa.aws.dk/postnumre')
  .then((response) => {
      let cities = [];
      for (let i = 0; i < response.data.length; i++) {
          let newCity = {}
          newCity.postalCode = response.data[i].nr
          newCity.name = response.data[i].navn
          cities.push(newCity)
      }

      city.bulkCreate(cities, {
          updateOnDuplicate: ["name"]
      })
    .then(() => {
          console.log('[MySQL] Cities fetched ...')
          callback()
      }).catch((error) => {
          console.log(error)
          callback()

      })
      

  })
  .catch((error) => {
      console.log(error)

  })

}

module.exports = {
  user,
  city,
  purchase,
  db,
  initialize
}