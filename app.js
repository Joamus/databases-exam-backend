const express = require('express')
const cors = require('cors')
const app = express();
const mysqlDb = require('./database/mysql/db')
const mongoDb = require('./database/mongodb/db')
const { api } = require('./config')

const userEndpoints = require('./api/endpoints/user')
const productEndpoints = require('./api/endpoints/product')
const basketEndpoints = require('./api/endpoints/basket')

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

function initializeDbs(callback) {

    mysqlDb.initialize((userModel, cityModel, purchaseModel) => {
        user = userModel
        city = cityModel
        purchase = purchaseModel
        callback()
    })
    mongoDb.getDb((error, connection) => {
        mongoConnection = connection
    })
}

function initializeEndpoints() {

    userEndpoints.initialize(app)
    productEndpoints.initialize(app)
    basketEndpoints.initialize(app)

    app.listen(api.port, () => {
        console.log(`[Node] Server listening on port ${api.port} ...`)
    })
}


function main() {
    initializeApiOptions()
    initializeDbs(() => {
        initializeEndpoints()
    })
    
}

main();
