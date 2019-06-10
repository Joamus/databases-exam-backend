const auth = require('../auth/auth')


let app
let mysqlModels
let mysqlDb
let mongoDb

module.exports.initialize = function(newApp, newMysqlModels, newMysqlDb, newMongoConnection) {
    app = newApp
    mysqlModels = newMysqlModels
    mysqlDb = newMysqlDb
    mongoDb = newMongoConnection


    app.post('/api/register', (req, res) => {
        createUser(req, res)
    })

    app.post('/api/login', (req, res) => {
        login(req, res)

    })

    getUser()
    deleteUser()
    updateUser()
    getAllUsers()
    resetUserPassword()
}

function login(req, res) {
    
    if (req.body.email && req.body.password) {
        mysqlModels.db.query('CALL authenticate_user (:v_email, :v_password)',
            { replacements: { v_email: req.body.email, v_password: req.body.password } })
            .spread(user => {
                if (user) {
                    let jsonUser = JSON.parse(JSON.stringify(user))
                    let token = {
                        "firstName": user.first_name,
                        "lastName": user.last_name,
                        "token": auth.generateToken(jsonUser)
                    }
                    res.send(token);
                } else {
                    res.status(404).json({ message: "Invalid credentials" });
                }
            })
            .catch(() => {
                res.status(404).json({ message: "Invalid credentials" });
            });
    } else {
        res.status(404).json({ message: "Invalid credentials" });
    }
}


function getUser() {
    app.get('/api/users/:userId', auth.requireRole(["0", "1"]), (req, res) => {
        if (req.params.userId == res.locals.user.id) {
            mysqlModels.user.findOne({ where: { id: req.params.userId } })
            .then(queryRes => {
                res.send(queryRes)
            })
            .catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(401).send('You can only get your own account.')
        }
    })
}

function deleteUser() {
    app.delete('/api/users/:userId', auth.requireRole(["0", "1"]), (req, res) => {
        if (req.params.userId == res.locals.user.id) {
            mysqlModels.user.update({"willDeleteAt": new Date().setFullYear(new Date().getFullYear() + 2)}, {
                where: {
                    id: req.params.userId
                }
            })
            .spread(queryRes => {
                if (queryRes == 1) {
                    res.send('The user is successfully deleted.')
                } else {
                    res.status(500).send('An error occurred.')
                }
            })
            .catch(error => {
                res.status(500).send('Error: ' + error)
            })
        } else {
            res.status(401).send('You can only delete your own account.')
        }
    })
}

function updateUser() {
    app.put('/api/users/:userId', auth.requireRole(["0", "1"]), (req, res) => {
        if (req.params.userId == res.locals.user.id) {
            mysqlModels.user.update(req.body, { where: { id: req.params.userId } })
            .then(queryRes => {
                res.send(queryRes)
            })
            .catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(401).send('You can only update your own account.')
        }
    })
}

function createUser(req, res) {
    mysqlModels.user.create({
        "email": req.body.email,
        "password": req.body.password,
        "address": req.body.address,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "cityPostalCode": req.body.cityPostalCode,
        "willDeleteAt": null
    })
        .then(() => {
            res.status(201).json({message: 'User registered'})
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

function getAllUsers() {
    app.get('/api/users', auth.requireRole(["1"]), (req, res) => {
        mysqlModels.user.findAll()
            .then(queryRes => {
                res.send(queryRes)
            })
            .catch(error => {
                res.status(500).send(error)
            })
    })
}

function resetUserPassword() {
    app.get('/api/users/:userId/reset-password', auth.requireRole(["0", "1"]), (req, res) => {
        if (req.params.userId == res.locals.user.id) {
            
            mysqlDb.db.query('CALL reset_password (:user_id)',
            { replacements: { user_id: req.params.userId } })
            .then(() => {
                res.status(200).json({message: 'The password has been reset successfully.'})
            })
            .catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(401).send('You can only reset your own password.')
        }
    })
}

