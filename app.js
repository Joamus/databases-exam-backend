const express = require('express')
const cors = require('cors')
const app = express();
const axios = require('axios')
const mysqlDb = require('./database/mysql/db')
const mongoDb = require('./database/mongodb/db')

const { api } = require('./config')

let user
let city
let purchase


function initializeApiOptions() {
    app.use(cors())

}

function syncDb() {
    mysqlDb.db.sync()
    .then(() => {

    })
    .catch(() => {

    })
}

function initializeDbs() {

    mysqlDb.authenticateDb()
    mongoDb.getDb((error, db) => {
        mongoConnection = db
    })
}

function initializeEndpoints() {
    app.listen(api.port, () => {
        console.log(`Node server listening on port ${api.port}...`)
    })
}


function main() {
    initializeApiOptions()
    initializeDbs()
    mysqlDb.initializeModels((userModel, cityModel, purchaseModel) => {
        user = userModel
        city = cityModel
        purchase = purchaseModel
        getCities()
        initializeEndpoints()

    })
    
}

function getCities() {
    axios.get('https://dawa.aws.dk/postnumre')
    .then((response) => {
        let cities = [];
       // console.log(response.data)

        for (let i = 0; i < response.data.length; i++) {
            let newCity = {}
            newCity.postal_code = response.data[i].nr
            newCity.name = response.data[i].navn
            cities.push(newCity)
        }

        city.bulkCreate(cities, {
            updateOnDuplicate: ["name"]
        })
        .then(() => {
            console.log('Cities created..')
        })
        

    })
    .catch((error) => {
        console.log(error)

    })

}



main();
