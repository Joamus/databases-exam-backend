let app
let mysqlModels
let mongoDb


function initialize(newApp, newMysqlModels, mongoConnection) {
    app = newApp
    mysqlModels = newMysqlModels
    mongoDb = mongoConnection

    app.get('/api/baskets', (req, res) => {
        getAllBaskets(req, res)
    })

    app.get('/api/baskets/:basketId', (req, res) => {
        getBasket(req, res)

    })

    app.delete('/api/baskets/:basketId', (req, res) => {
        deleteBasket(req, res)

    })

    app.post('/api/baskets', (req, res) => {
        postBasket(req, res)
    })

}

function getBasket(req, res) {
    mongoDb.collection('baskets').find({_id: req.params.basketId}, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
    

}

function getAllBaskets(req, res) {
    mongoDb.collection('baskets').find({user_id: res.locals.user.id}).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

function deleteBasket() {
    

}


function postBasket(req, res) {
    
}

function createBasket(products, userId, callback) {
    mongoDb.collection('baskets').insertOne(
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




