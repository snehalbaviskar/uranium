const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

const { checkData, validTitle, validString, validMobileNum, validEmail, validPwd} = require("../validator/validation")

/////////////////////////////////////////////////create User////////////////////////////////////////////////////////////////////////////////

const createUser= async function(req, res) {
    try{
    let data= req.body

    if(checkData(data)) return res.status(400).send({status: false, message: "Enter user details"})

    //Data is Present or not
    if(!data.title) return res.status(400).send({status: false, message: "Title is required"}) 
    if(!data.name) return res.status(400).send({status: false, message: "Name is required"})
    if(!data.phone) return res.status(400).send({status: false, message: "Mobile number is required"})
    if(!data.email) return res.status(400).send({status: false, message: "Email ID is required"})
    if(!data.password) return res.status(400).send({status: false, message: "Password is required"})

    //Data is valid or not
    if(validTitle(data.title)) return res.status(400).send({status: false, message: "Title should be one of Mr, Mrs or Miss"})
    if(validString(data.name)) return res.status(400).send({status: false, message: "Name should be characters and should not contains any numbers"})
    if(validMobileNum(data.phone)) return res.status(400).send({status: false, message: "Enter a 10-digit phone number exluding (+91)"})
    if(validEmail(data.email)) return res.status(400).send({status: false, message: "Enter a valid email-id"})
    if(validPwd(data.password)) return res.status(400).send({status: false, message: "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters"})

    //check email and password
    let checkUniqueValues = await userModel.findOne({$or: [{phone: data.phone}, {email: data.email}]})
    if(checkUniqueValues) return res.status(400).send({status: false, message: "E-Mail or phone number already exist"})

    // here we can start user creation
    let userData= await userModel.create(data)
    res.status(201).send({status: true, message: "User created successfully", data: userData})
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

/////////////////////////////////////////////////////////Login User///////////////////////////////////////////////////////////////////////////

const loginUser = async (req, res) => {
    try{
        let data = req.body;

        //check data is present or not
        if(Object.keys(data).length == 0) return res.status(400).send({status: false, message: "Email and Password is required for login"})

        //check email or password is present or not
        if(!data.email) return res.status(400).send({status: false, message: "Email field is empty"})
        if(!data.password) return res.status(400).send({status: false, message: "Password field is empty"})

        //validate email and password
        if(validEmail(data.email)) return res.status(400).send({status: false, message: "Enter a valid email-id"})
        if(validPwd(data.password)) return res.status(400).send({status: false, message: "Enter a valid password"})

        //check email and password is in same or not
        let getUserData = await userModel.findOne({email: data.email, password: data.password})
        if(!getUserData) return res.status(400).send({status: false, message: "Email or password is invalid"})

        //token generation for the logged in user
        let token = jwt.sign({userId: getUserData._id,
            iat: Math.floor(Date.now() / 1000),           //issue date
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24  //expires in 1 hr
        }, 
        "Uranium Project-3"
        );

        res.status(200).send({status: true, message: "user login successfully", data: {token: token}})
        
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


module.exports = { createUser, loginUser}