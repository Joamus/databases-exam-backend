let app
let mysqlModels

module.exports.initialize = function (newApp, newMysqlModels) {
    app = newApp
    mysqlModels = newMysqlModels

    getUser()
    deleteUser()
    updateUser()
    postUser()
    getAllUsers()

}


function getUser() {

}

function deleteUser() {

}

function updateUser() {

}

function postUser() {
    app.post('/api/users/create', (req, res) => {
        console.log(req.body)
        // TODO: opret en record baseret på req.body
    })
}

function getAllUsers() {
    
}

