const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const { checkData, validTitle, validString, validMobileNum, validEmail, validPwd} = require("../validator/validation")

const createUser= async function(req, res) {
    try{
    let data= req.body

    if(checkData(data)) return res.status(400).send({status: false, message: "Enter user details"})

    if(!data.title) return res.status(400).send({status: false, message: "Title is required"}) 
    if(!data.name) return res.status(400).send({status: false, message: "Name is required"})
    if(!data.phone) return res.status(400).send({status: false, message: "Mobile number is required"})
    if(!data.email) return res.status(400).send({status: false, message: "Email ID is required"})
    if(!data.password) return res.status(400).send({status: false, message: "Password is required"})

    if(validTitle(data.title)) return res.status(400).send({status: false, message: "Title should be one of Mr, Mrs or Miss"})
    if(validString(data.name)) return res.status(400).send({status: false, message: "Name should be valid and should not contains any numbers"})
    if(validMobileNum(data.phone)) return res.status(400).send({status: false, message: "Enter a valid phone number"})
    if(validEmail(data.email)) return res.status(400).send({status: false, message: "Enter a valid email-id"})
    if(validPwd(data.password)) return res.status(400).send({status: false, message: "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters"})

    let checkUniqueValues = await userModel.findOne({$or: [{phone: data.phone}, {email: data.email}]})
    if(checkUniqueValues) return res.status(400).send({status: false, message: "E-Mail or phone number already exist"})

    //hass password
    //data.password = await bcrypt.hash(data.password, 10); //


    let userData= await userModel.create(data)
    res.status(201).send({status: true, message: "User created successfully", data: userData})
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


const loginUser = async (req, res) => {
    try{
        let data = req.body;
        if(Object.keys(data).length == 0) return res.status(400).send({status: false, message: "data is required for login"})

        if(!data.email) return res.status(400).send({status: false, message: "Email is required"})
        if(!data.password) return res.status(400).send({status: false, message: "Password is required"})

        if(validEmail(data.email)) return res.status(400).send({status: false, message: "Enter a valid email-id"})
        if(validPwd(data.password)) return res.status(400).send({status: false, message: "Enter a valid password"})

        let getUserData = await userModel.findOne({email: data.email, password: data.password})
        if(!getUserData) return res.status(400).send({status: false, message: "Email or password is invalid"})

        let token = jwt.sign({userId: getUserData._id,
            iat: Math.floor(Date.now() / 1000), //issue date
            exp: Math.floor(Date.now() / 1000) + 60 * 60 //expiry date
        }, 
        "Uranium Project-3"
        );
        //set the headers
        //res.setHeader('x-api-key', token);

        if(!token) return res.status(400).send({status: false, message: "Token is required"})

        res.status(201).send({status: true, message: "user login successfully", data: {token: token}})
        
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

// module.exports.loginUser = loginUser

// module.exports.createUser= createUser

module.exports = { createUser, loginUser}