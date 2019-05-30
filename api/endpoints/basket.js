let app
let mysqlModels
let mongoDb


function initialize(newApp, newMysqlModels, mongoConnection) {
    app = newApp
    mysqlModels = newMysqlModels
    mongoDb = mongoConnection

    app.get('/api/basket/:basketId', (req, res) => {
        getBasket()

    })

    app.delete('/api/basket/:basketId', (req, res) => {
        deleteBasket()

    })

    app.post('/api/basket', (req, res) => {
        postBasket(req, res)
    })

}

function getBasket() {
    

}

function deleteBasket() {
    

}


function postBasket(req, res) {
    
}

function createBasket(products, userId, callback) {
    mongoDb.collection('basket').insertOne(
        {
            "user_id": userId,
            "products": products
            
        }, 
    (err, result) => {
        if (err) throw err;
        callback(err, result.ops[0])

    })

}

module.exports = {
    initialize,
    createBasket,

}




