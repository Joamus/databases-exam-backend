let app 

module.exports.initialize = function (expressApp) {
    app = expressApp

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

