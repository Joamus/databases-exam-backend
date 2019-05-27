let app

module.exports.initialize = function(expressApp) {
    app = expressApp

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
    app.delete('/api/product/:productId', (req, res) => {

    })

}

function postProduct() {
    app.post('/api/product', (req, res) => {

    })
}

function updateProduct() {
    app.post('/api/product/:productId', (req, res) => {
        res.send('updateProduct')

    })
}

function getAllProducts() {


}