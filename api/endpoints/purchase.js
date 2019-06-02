const basket = require('./basket')
const product = require('./product')

let app
let mysqlModels = []
let mongoDb

function initialize(newApp, newMysqlModels, newMongoDb) {
    app = newApp
    mysqlModels = newMysqlModels
    mongoDb = newMongoDb

    app.post('/api/purchases', (req, res) => {
        postPurchase(req, res)
    })

    app.get('/api/purchases', (req, res) => {
        getPurchases(req, res)
    })

}

function getPurchases(req, res) {
    mysqlModels.purchase.findAll({where: {user_id: res.locals.user.id}})
    .then((result) => {
        res.send(result)

    }).catch((err, result) => {
        res.status(404).json({})

    })
}


function postPurchase(req, res) {
    product.findProductsByName(req.body.products, (error, products) => {
        products.forEach((product, i) => {
            if(!req.body.products[i].quantity) {
                product.quantity = 1
            } else {
            product.quantity = req.body.products[i].quantity
            }
        })

        let user = res.locals.user
        basket.createBasket(products, user.id, (error, result) => {
            if (error) {
                res.status(400).json({error: "An error happened", message: result})
            } else {
                createPurchase(req.body.address, req.body.cityPostalCode, result, (error, purchaseResult) => {
                    res.send(purchaseResult)

                })
            }

        })

    })
    }


function createPurchase(address, cityPostalCode, result, callback) {
    result.grossAmount = 0
    result.netAmount = 0
    result.products.forEach((product) => {
        result.grossAmount += product.price * product.quantity
        result.netAmount += product.price * product.quantity - product.details.wholesalePrice * product.quantity

    })



    mysqlModels.purchase.create({
        address: address,
        cityPostalCode: cityPostalCode,
        basketId: String(result._id),
        userId: result.user_id,
        grossAmount: (result.grossAmount).toFixed(2),
        netAmount: (result.netAmount).toFixed(2)
    
    }).then((result) => {
        callback(null, result)

    }).catch((error, result) => {
        callback(error, result)
    })
    
    

}

module.exports = {
    initialize
}