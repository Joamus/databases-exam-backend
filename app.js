const express = require('express')
const cors = require('cors')
const app = express();
const mysqlDb = require('./database/mysql/db')
const mongoDb = require('./database/mongodb/db')

const { api } = require('./config')

const userSchema = require('./database/mysql/models/user')
let user

let mysqlConnection
let mongoConnection


function initializeApiOptions() {
    app.use(cors())

}

function initializeModels() {
    user = mysqlConnection.define('user', userSchema, mysqlDb.options)
    user.sync()
    .then(() => {})
    .catch(() => {})

}

function syncDb() {
    db.sync()
    .then(() => {

    })
    .catch(() => {

    })
}

function initializeDbs() {

    mysqlConnection = mysqlDb.db
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
    initializeModels()
    initializeEndpoints()
    

}

main();

