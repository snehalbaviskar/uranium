const { default: mongoose } = require('mongoose');
const blogModel = require('../models/blogModel');

const isValidObjectId =function(Id){
    return mongoose.Types.ObjectId.isValid(Id)
}
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
// "       "





const createBlog = async function(req,res){
    let data = req.body
    if(!isValid(data))
    return res.status(404).send({status:false, msg:"author Id is not exist"})

    let authorId = req.body.authorId
    if(!isValidObjectId(authorId))
    return res.status(400).send({status:false, msg:"author Id is not exist"})
    let blogCreated = await blogModel.create(data)
    res.status(201).send({data : blogCreated})
    
}

const getblog = async function(req,res){
   
    let data = req.query
    const {authorId , category, subcategory, tags} =data
    let filter = {isDeleted: false, isPublished:true}
    if(authorId){
        filter["authorId"]=authorId
    }
    if(category){
        filter["category"]=category
    }
    if(subcategory){
        filter["subcategory"]=subcategory
    }
    if(tags){
        filter["tags"]=tags
    }
    
    let blogs = await blogModel.find(filter)
    
    if(blogs.length==0)
    res.status(404).send({status:false, msg:"document not found"})
    res.status(200).send({status:true, data: blogs})

}

const updateblog =async function(req,res){
    let data = req.body
    let blogId = req.param.blogId
    let blog = await blogModel.findById(blogId)
    console.log(blog)
    if(!!isValidObjectId(blogId))
    return res.status(404).send({status:false, msg: "blogId is not present"})
    else{
    let updatedBlog = await blogModel.findByIdAndUpdate({_Id:blogId}, {$set:data},{new:true, publishedAt:Date.now()}) 
    req.status(200).send({status:true, data:updatedBlog})  
    }
}





module.exports.getblog = getblog

module.exports.createBlog = createBlog
module.exports.updateblog =updateblog