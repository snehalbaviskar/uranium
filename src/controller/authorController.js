
// const Isemail = require('isemail');
const authorModel = require('../models/authorModel');
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


module.exports.createAuthor = createAuthor