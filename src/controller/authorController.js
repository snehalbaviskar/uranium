
// const Isemail = require('isemail');
const authorModel = require('../models/authorModel');
const jwt = require("jsonwebtoken");

const isValid = function(value)
{
    if(typeof value === 'undefined' || value === null){
        return false
    }
    if(typeof value === 'string' && value.trim().length == 0){
        return false
    }
    return true

}

const createAuthor = async function(req,res){
    try{

    let author = req.body

    if(!author)
    res.status(404).send({status:false, msg: "no such author exist"})

    let authorCreated = await authorModel.create(author)
    res.status(201).send({status:true, data : authorCreated})
}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}
    
}

const loginAuthor = async function (req, res) {
    try{

    let emailID = req.body.email;
    let password = req.body.password;
  
    let author = await authorModel.findOne({ email: emailID, password: password });

    if (!author)
      return res.status(401).send({status: false,msg: "emailID and the password is not corerct",});

let token = jwt.sign(
    {
      authorId: author._id.toString(),
    },
    "author-blog"
  );
  res.setHeader("x-api-key", token);
  res.status(200).send({ status: true, data: token });
}
catch (err){
    res.status(500).send({ msg: "Error", error: err.message })
}
};


module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor