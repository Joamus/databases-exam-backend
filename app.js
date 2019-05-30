const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mysqlDb = require('./database/mysql/db')
const mongoDb = require('./database/mongodb/db')
const { api } = require('./config')

const auth = require('./api/auth/auth.js')

const userEndpoints = require('./api/endpoints/user')
const productEndpoints = require('./api/endpoints/product')
const basketEndpoints = require('./api/endpoints/basket')
const purchaseEndpoints = require('./api/endpoints/purchase')

let user
let city
let purchase


function initializeApiOptions() {
    app.use(cors())
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    app.all('/api/*', (req, res, next) => {
        auth.authenticateRequest(req, res, next)
    })

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
        mongoDb.getDb((error, connection) => {
            callback(mysqlModels, connection)
        })
    })
    
}

function initializeEndpoints(mysqlModels, mongoConnection) {
    userEndpoints.initialize(app, mysqlModels, mysqlDb, mongoConnection)
    productEndpoints.initialize(app, mysqlModels, mongoConnection)
    basketEndpoints.initialize(app, mysqlModels, mongoConnection)
    purchaseEndpoints.initialize(app, mysqlModels, mongoConnection)

    app.listen(api.port, () => {
        console.log(`[Node] Server listening on port ${api.port} ...`)
    })
}

function main() {
    initializeApiOptions()
    initializeDbs((mysqlModels, mongoConnection) => {
        initializeEndpoints(mysqlModels, mongoConnection)
    })
    
}
main();
