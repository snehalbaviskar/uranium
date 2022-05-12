const bookModel = require("../models/bookModel")
const jwt = require('jsonwebtoken')

/////////////////////////////////////////////////Authentication//////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////Authorization/////////////////////////////////////////////////////////////////////////

const authorization = async (req, res, next) => {
    try{
        let token = req.headers["x-Api-key"]
        if (!token) token = req.headers["x-api-key"]

        let decodedToken = jwt.verify(token, "Uranium Project-3")
        if(!decodedToken) return res.status(400).send({status: false , message: "Invalid token id"})

        let loggedInUser = decodedToken.userId
        let userLogging = req.body.userId

        let bookData = await bookModel.findById(req.params.bookId)
        if(!bookData) return res.status(400).send({status: false, message: "Error! Please check book id and try again"})
        userLogging = bookData.userId

        if(!userLogging) return res.status(400).send({status: false, message: "User is is required"})

        if(loggedInUser !== userLogging) return res.status(401).send({status: false, message: "Error, authorization failed"})
        next()
    }catch(err){
        return res.status(500).send({status: false, Error: err.message})
    }
}

module.exports = {authentication, authorization}