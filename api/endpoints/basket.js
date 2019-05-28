let app
let mysqlModels

module.exports.initialize = function(newApp, newMysqlModes) {
    app = newApp
    mysqlModels = newMysqlModes
    
    getBasket()
    deleteBasket()
    postBasket()


}

function getBasket() {
    app.get('/api/basket/:basketId', (req, res) => {

    })

}

function deleteBasket() {
    app.delete('/api/basket/:basketId', (req, res) => {

    })

}

function postBasket() {
    app.post('/api/basket', (req, res) => {
        
    })
}


