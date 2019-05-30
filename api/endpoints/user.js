const auth = require('../auth/auth')


let app
let mysqlModels
let mysqlDb

module.exports.initialize = function (newApp, newMysqlModels, newMysqlDb) {
    app = newApp
    mysqlModels = newMysqlModels
    mysqlDb = newMysqlDb

    login()
    getUser()
    deleteUser()
    updateUser()
    createUser()
    getAllUsers()
    resetUserPassword()
}

function login() {
    app.post('/api/login', (req, res) => {
        if(req.body.email && req.body.password) {
            mysqlModels.user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            attributes: ['id', 'email', 'role']
            })
            .then(user => {
                console.log(user)
                let jsonUser = JSON.parse(JSON.stringify(user))
                let token = auth.generateToken(jsonUser)
                jsonUser.token = token;
                res.send(jsonUser);
            })
            .catch(error => {
                res.status(404).json({message: "Invalid credentials"});
            })
        } else {
            res.status(404).json({message: "Invalid credentials"});
        }

    })
    
    
}


function getUser() {

    app.get('/api/users/:userId', auth.requireRole(["1"]), (req, res) => {
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
    app.post('/api/users/:userId', auth.requireRole(["1"]), (req, res) => {
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
    app.post('/api/users/create', auth.requireRole(["1"]), (req, res) => {
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
    app.get('/api/users', auth.requireRole(["1"]), (req, res) => {
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
    app.get('/api/users/:userId/reset-password', auth.requireRole(["1"]), (req, res) => {
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

