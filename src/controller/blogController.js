
const blogModel = require('../models/blogModel');

const createBlog = async function(req,res){
    let Blog = req.body
    let authorId = req.body.authorId
    if(!authorId)
    res.status(400).send({status:false, msg:"author Id is not exist"})
    let blogCreated = await blogModel.create(Blog)
    res.status(201).send({data : blogCreated})
    
}

module.exports.createBlog = createBlog