const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    try{
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

module.exports.createUser= createUser