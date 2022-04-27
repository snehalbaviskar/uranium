
// const Isemail = require('isemail');
const authorModel = require('../models/authorModel');

const createAuthor = async function(req,res){
    let author = req.body
    let authorCreated =await authorModel.create(author)
    res.status(201).send({data : authorCreated})
    
}


module.exports.createAuthor = createAuthor