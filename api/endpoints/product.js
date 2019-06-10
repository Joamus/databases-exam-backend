const auth = require('../auth/auth')

let app
let mysqlModels
let mongoDb

function initialize(newApp, newMysqlModels, newMongoConnection) {
    app = newApp
    mysqlModels = newMysqlModels
    mongoDb = newMongoConnection

    app.get('/api/products/:productId', (req, res) => {
        getProduct(req, res)

    })
 
    app.delete('/api/products/:productId', auth.requireRole(["1"]), (req, res) => {
        deleteProduct(req, res)

    })
    
    app.post('/api/products', auth.requireRole(["1"]), (req, res) => {
        postProduct(req, res)

    })

    app.put('/api/products/:productId', auth.requireRole(["1"]), (req, res) => {
        res.send('updateProduct')

    })

    app.get('/api/products', (req, res) => {
        getAllProducts(req, res)
    })
    
}

function getAllProducts(req, res) {
    mongoDb.collection('products').find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

function getProduct(req, res) {
    mongoDb.collection('products').find({_id: req.params.productId}, (err, result) => {
        res.send(result)
    })
    
}

function deleteProduct() {
    

}

function postProduct() {
    
}

function putProduct() {
    
}


function findProductsByName(products, callback) {
    productNames = []
    products.forEach((element) => {
        if (element.name) {
            productNames.push(element.name)
        }
    })
        mongoDb.collection('products').find(
            {
                "name": {
                    "$in": productNames
                }
            }, 
        
         ).project({
            "amount": 0
        }).toArray((err, result) => {
             if (err) throw err
             callback(err, result)
         })
}

function subtractStock(products, i, callback) {
    if (i < products.length) {
        mongoDb.collection('products').find({"name": products[i].name}, (err, result) => {
            let existingStock = result.existingStock
            let newAmount = existingStock-products[i].amount
            mongoDb.collection('products').updateOne({"name": products[i].name}, {
                $set: {"amount": newAmount}
            }, (err, result) => {
                if (err) throw err
                subtractStock(products, i, subtractedAmount, callback)
            })
    })
    }
    callback()
}



module.exports = {
    initialize,
    findProductsByName
}