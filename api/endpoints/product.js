const auth = require('../auth/auth')

let app
let mysqlModels

module.exports.initialize = function(newApp, newMysqlModels) {
    app = newApp
    mysqlModels = newMysqlModels
 
    getProduct()
    deleteProduct()
    postProduct()
    updateProduct()
    getAllProducts()

}

function getProduct() {
    app.get('/api/product', (req, res) => {
        res.send('heeey')

    })
}

function deleteProduct() {
    app.delete('/api/product/:productId', auth.requireRole(["1"]), (req, res) => {

    })

}

function postProduct() {
    app.post('/api/product', auth.requireRole(["1"]), (req, res) => {

    })
}

function updateProduct() {
    app.post('/api/product/:productId', auth.requireRole(["1"]), (req, res) => {
        res.send('updateProduct')

    })
}

function getAllProducts() {


}