const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    try{
        let token = req.headers['x-Api-key']
        if(!token) token = req.headers['x-api-key']
        if(!token){
            return res.status(400).send({status: false, message: "Token must be present"})
        }

        let decodedToken = jwt.verify(token, "Uranium Project-3")
        if(!decodedToken) return res.status(400).send({status: false , message: "Invalid token id"})
        next()
    }catch(err){
        return res.status(500).send({Status: false, Error: err.message})
    }
}

const authorization = async (req, res, next) => {
    try{

    }catch(err){
        return res.status(500).send({status: false, Error: err.message})
    }
}

module.exports = {authentication, authorization}