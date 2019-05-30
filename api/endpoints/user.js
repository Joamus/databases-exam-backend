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
            mysqlDb.db.query('CALL authenticate_user (:v_email, :v_password)',
            { replacements: { v_email: req.body.email, v_password: req.body.password }})
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
                    res.status(404).json({message: "Invalid credentials"});
                }
            }) 
            .catch(() => {
                res.status(404).json({message: "Invalid credentials"});
            });
        } else {
            res.status(404).json({message: "Invalid credentials"});
        }
    })
}


function getUser() {

    app.get('/api/users/:userId', auth.requireRole(["1"]), (req, res) => {
        mysqlDb.db.query('CALL get_user (:v_user_id)',
        { replacements: { v_user_id: req.params.userId }})
        .spread(user => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).json({message: "No user with id: " + req.params.userId});
            }
        })
        .catch(error => {
            res.status(404).json({message: error});
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
    app.post('/api/users', auth.requireRole(["1"]), (req, res) => {
        mysqlDb.db.query('CALL create_user (:v_email, :v_password, :v_address, :v_role, :v_first_name, :v_last_name, :v_city_postal)',
        { replacements: { 
            v_email: req.body.email,
            v_password: req.body.password,
            v_address: req.body.address,
            v_role: req.body.role,
            v_first_name: req.body.first_name,
            v_last_name: req.body.last_name,
            v_city_postal: req.body.city_postal
        }})
        .spread(queryRes => {
            if (queryRes[Object.getOwnPropertyNames(queryRes)[0]] === 1) {
                res.send('User created successfully')
            } else {
                res.send('User could not be created')
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
    })
}

function getAllUsers() {
    app.get('/api/users', auth.requireRole(["1"]), (req, res) => {
        mysqlDb.db.query('CALL get_users ()')
        .spread(users => {
            if (users) {
                res.send(users);
            } else {
                res.status(404).json({message: "No existing users"});
            }
        })
        .catch(error => {
            res.status(404).json({message: error});
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

