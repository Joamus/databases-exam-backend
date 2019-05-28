let app
let mysqlModels
let mysqlDb

module.exports.initialize = function (newApp, newMysqlModels, newMysqlDb) {
    app = newApp
    mysqlModels = newMysqlModels
    mysqlDb = newMysqlDb

    getUser()
    deleteUser()
    updateUser()
    createUser()
    getAllUsers()
    resetUserPassword()
}


function getUser() {
    app.get('/api/users/:userId', (req, res) => {
        mysqlModels.user.findOne({ where: { id: req.params.userId }})
        .then(queryRes => {
            res.send(queryRes)
        })
        .catch(error => {
            res.send(error)
        })
    })
}

function deleteUser() {

}

function updateUser() {
    app.post('/api/users/:userId', (req, res) => {
        let user;
        
        mysqlModels.user.update(req.body, { where: { id: req.params.userId }} )
        .then(queryRes => {
            res.send(queryRes)
        })
        .catch(error => {
            res.send(error)
        })
    })
}

function createUser() {
    app.post('/api/users/create', (req, res) => {
        mysqlModels.user.create({
            "email": req.body.email,
            "password": req.body.password,
            "address": req.body.address,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "will_delete_at": null
        })
        .then(() => {
            res.send('user created')
        })
        .catch(error => {
            res.send(error)
        })
    })
}

function getAllUsers() {
    app.get('/api/users', (req, res) => {
        mysqlModels.user.findAll()
        .then(queryRes => {
            res.send(queryRes)
        })
        .catch(error => {
            res.send(error)
        })
    })
}

function resetUserPassword() {
    app.get('/api/users/:userId/reset-password', (req, res) => {
        mysqlDb.db.query('CALL reset_password (:user_id)',
        { replacements: { user_id: req.params.userId}})
        .then(() => {
            res.send('The password has been reset successfully.')
        })
        .catch(error => {
            res.send(error)
        })
    })
}

