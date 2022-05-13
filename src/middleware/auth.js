const bookModel = require("../models/bookModel")
const jwt = require('jsonwebtoken')

const {isValidObjectId} = require("../validator/validation")

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
     let userLogging;
    //    let userLogging1;
    //    let userLogging2;

        if(req.body.hasOwnProperty('userId')){
            if(!isValidObjectId(req.body.userId)) return res.status(400).send({status: false, message: "Enter a valid user Id"})
            userLogging = req.body.userId
            console.log("req.body",userLogging)
        }

        if(req.params.hasOwnProperty('bookId')){
            if(!isValidObjectId(req.params.bookId)) return res.status(400).send({status: false, message: "Enter a valid book id"})
            let bookData = await bookModel.findById(req.params.bookId)
            if(!bookData) return res.status(400).send({status: false, message: "Error! Please check book id and try again"})
             userLogging = bookData.userId
             console.log("BookModel",userLogging)
        }

        if(!userLogging) return res.status(400).send({status: false, message: "User Id is required"})

        if(loggedInUser !== userLogging ) return res.status(401).send({status: false, message: "Error, You are not authorised user"})
        next()
    }catch(err){
        return res.status(500).send({status: false, Error: err.message})
    }
}

module.exports = {authentication, authorization}