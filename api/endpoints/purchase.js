const basket = require('./basket')
const product = require('./product')

let app
let mysqlModels = []
let mongoDb

function initialize(newApp, newMysqlModels, newMongoDb) {
    app = newApp
    mysqlModels = newMysqlModels
    mongoDb = newMongoDb

    app.post('/api/purchase', (req, res) => {
        postPurchase(req, res)
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
                res.status(500).json({error: "An error happened", message: result})
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
        result.netAmount += product.price * product.quantity - product.retailPrice * product.quantity

    })


    mysqlModels.purchase.create({
        address: address,
        cityPostalCode: cityPostalCode,
        basketId: String(result._id),
        userId: result.user_id,
        grossAmount: result.grossAmount,
        netAmount: result.netAmount
    
    }).then((result) => {
        callback(null, result)

    }).catch((error, result) => {
        callback(error, result)
    })
    
    

}

module.exports = {
    initialize
}