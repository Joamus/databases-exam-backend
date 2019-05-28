'use strict'

const fs = require('fs')
const jwt = require('jsonwebtoken')

function generateToken(payload) {

    let privateKey = fs.readFileSync('./api/auth/private.key', 'utf8')

    let signOptions = {
        issuer: 'gjk portal',
        audience: 'http://gjk.dk',
        algorithm: "RS256"
    }

    let token = jwt.sign(payload, privateKey, signOptions)
    return token;

}

function verifyToken(token) {

    let publicKey = fs.readFileSync('./api/auth/public.key', 'utf8')
    

    let verifyOptions = {
        issuer: 'gjk portal',
        audience: 'http://gjk.dk',
        algorithm: ["RS256"]
    }

    let legit = jwt.verify(token, publicKey, verifyOptions)
    return legit;

}

function authenticateRequest(req, res, next) {
    if (req.path == '/api/login') {
      return next();
    }
    let decoded
    try {
      const token = req.headers.authorization.split(' ')[1]
      decoded = verifyToken(token)
      res.locals.user = decoded;
      next()
    } catch(err) {
      if (!decoded) {
        res.status(401).json({message: 'Please provide valid token', status: 401})
      }
    }
}

function requireRole(roles) {
  
  return function(req, res, next) {

    if (res.locals.user && roles.includes(res.locals.user.role)) {  
      next()
    } else {
      res.status(403).json({message: "Not authorized"})


    }
  }

}

module.exports = {
  verifyToken,
  generateToken,
  authenticateRequest,
  requireRole
}