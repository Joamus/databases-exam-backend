const auth = require('../auth/auth')

let app
let mysqlModels
let mongoDb

function initialize(newApp, newMysqlModels, newMongoConnection) {
    app = newApp
    mysqlModels = newMysqlModels
    mongoDb = newMongoConnection

    app.get('/api/product', (req, res) => {
        getProduct()

    })
 
    app.delete('/api/product/:productId', auth.requireRole(["1"]), (req, res) => {
        deleteProduct()

    })
    
    app.post('/api/product', auth.requireRole(["1"]), (req, res) => {
        postProduct()

    })

    app.put('/api/product/:productId', auth.requireRole(["1"]), (req, res) => {
        res.send('updateProduct')

    })

    app.get('/api/product', auth.requireRole(["1"], (req, res) => {
        
    }))
    
    
    putProduct()
    getAllProducts()

}

function getProduct() {
    
}

function deleteProduct() {
    

}

function postProduct() {
    
}

function putProduct() {
    
}

function getAllProducts() {


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
            "name": 1,
            "price": 1,
            "retailPrice": 1,
        }).toArray((err, result) => {
             if (err) throw err
             callback(err, result)
         })
}



module.exports = {
    initialize,
    findProductsByName
}