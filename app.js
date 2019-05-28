const express = require('express')
const cors = require('cors')
const app = express();
const mysqlDb = require('./database/mysql/db')
const mongoDb = require('./database/mongodb/db')
const { api } = require('./config')

const userEndpoints = require('./api/endpoints/user')
const productEndpoints = require('./api/endpoints/product')
const basketEndpoints = require('./api/endpoints/basket')

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
    mysqlDb.initialize((mysqlModels) => {
        callback(mysqlModels)
    })
    mongoDb.getDb((error, connection) => {
        mongoConnection = connection
    })
}

function initializeEndpoints(mysqlModels) {
    userEndpoints.initialize(app, mysqlModels)
    productEndpoints.initialize(app, mysqlModels)
    basketEndpoints.initialize(app, mysqlModels)

    app.listen(api.port, () => {
        console.log(`[Node] Server listening on port ${api.port} ...`)
    })
}

function main() {
    initializeApiOptions()
    initializeDbs((mysqlModels) => {
        initializeEndpoints(mysqlModels)
    })
    
}
main();
