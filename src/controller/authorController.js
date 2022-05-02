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

//Create an author - atleast 5 authors
//Create a author document from request body. Endpoint: BASE_URL/authors

const createAuthor = async function(req,res){
    try{

    let data = req.body
    let {Fname, Lname, title, email, password}= data

    if(!isValid(Fname))
    return res.status(400).send({status:false, msg : "Fname is not exist"})

    if(!isValid(Lname))
    return res.status(400).send({status:false, msg : "Lname is not exist"})

    if(!isValid(title))
    return res.status(400).send({status:false, msg:"title is not exist"})

    if(!isValid(email))
    return res.status(400).send({status:false, msg:"email is not exist"})

    if(!isValid(password))
    return res.status(400).send({status:false, msg:"password is not exist"})

    let authorCreated = await authorModel.create(data)
    res.status(201).send({status:true, data : authorCreated})
}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}
    
}


// Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId
// If the credentials are incorrect return a suitable error message with a valid HTTP status code

const loginAuthor = async function (req, res) {
    try{

    let email = req.body.email;
    let password = req.body.password;

    if(!isValid(email))
    return res.status(400).send({status:false, msg:"email must be present"})

    if(!isValid(password))
    return res.status(400).send({status:false, msg:"password must be present"})
  
    let author = await authorModel.findOne({ email: email, password: password });

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