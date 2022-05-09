const userModel = require("../models/userModel")

const { validEmail, validPwd} = require("../validator/validation")

const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try{
        let data = req.body;
        if(Object.keys(data).length == 0) return res.status(400).send({status: false, message: "data is required for login"})

        if(!data.email) return res.status(400).send({status: false, message: "Email is required"})
        if(!data.password) return res.status(400).send({status: false, message: "Password is required"})

        if(!validEmail(data.email)) return res.status(400).send({status: false, message: "Enter a valid email-id"})
        if(validPwd(data.password)) return res.status(400).send({status: false, message: "Enter a valid password"})

        let getUserData = await userModel.findOne({email: data.email, password: data.password})
        if(!getUserData) return res.status(400).send({status: false, message: "Email or password is invalid"})

        let token = jwt.sign({userId: getUserData._id}, "Uranium Project-3" , {expiresIn: '1h'} )
        if(!token) return res.status(400).send({status: false, message: "Token is required"})

        res.status(201).send({status: true, message: "user login successfully", data: {token: token}})
        
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

module.exports.loginUser = loginUser