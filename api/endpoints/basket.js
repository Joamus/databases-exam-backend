let app

module.exports.initialize = function(expressApp) {
    app = expressApp
    
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


