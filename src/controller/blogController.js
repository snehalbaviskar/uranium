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




const createBlog = async function(req,res){
    try{
    let data = req.body
    if(!isValid(data))
    return res.status(404).send({status:false, msg:" Please enter valid data"})

    let authorId = req.body.authorId
    if(!isValidObjectId(authorId))
    return res.status(400).send({status:false, msg:"author Id is not exist"})
    let blogCreated = await blogModel.create(data)
    res.status(201).send({data : blogCreated})
    }
    catch(err){
        res.status(500).send({msg:"Error", error:err.message})
    }
    
}

const getblog = async function(req,res){
   
    try{
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
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}

}

const updateblog =async function(req,res){
    try{
    let data = req.body
   

    let blogId = req.params.blogId
   
    let blog = await blogModel.findById(blogId)
    console.log(blog)

    if(!isValid(data))
    return res.status(404).send({status:false, msg:" No such document is not present"})


    if(!isValidObjectId(blogId))
    return res.status(404).send({status:false, msg: "No such blogId is exist"})

    if(blog.isDeleted==true)
    return res.status(404).send({status:false, msg: "No such blog exist or the blog is delted"})
    


    let updatedBlog = await blogModel.findByIdAndUpdate({_Id:blogId}, {$set:data},{new:true, publishedAt:Date.now()}) 
    res.status(200).send({status:true, data:updatedBlog}) 
}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
} 
    
}

const deleteById =async function(req,res){

    try{
    let blogId  =req.params.blogId

    if(!!isValidObjectId(blogId))
    return res.status(404).send({status:false, msg: "No such blogId is exist"})
   
    let blog = await blogModel.findOne({$and:[{_id:blogId},{isDeleted:false}]})
  
    if(!blog)
    res.status(404).send({status:false, msg: "No such blog exist or the blog is deleted"})

    if(blog.isDeleted==true)
    return res.status(404).send({status:false, msg: "No such blog exist or the blog is delted"})

    let afterDeletion =await blogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new:true})
    
    res.status(200).send({status:true, data:afterDeletion})
}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}

}

let deleteBlogByParam = async function(req,res){

  try{
    let data = req.query
    if(!data)
    res.status(404).send({status:false, msg: "No such document exist or the blog is deleted"})
    
    let blog = await blogModel.find(data).select({authorId:1, _id:1})

    if(!blog)
    res.status(404).send({status:false, msg: "No such blog exist or the blog is deleted"})

    let deletedBlog =await blogModel.findOneAndUpdate({_id:{$in:blog}},{$set:{isDeleted:true}},{new:true})
    res.status(200).send({status:true, data:deletedBlog})

}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}


}




module.exports.getblog = getblog

module.exports.createBlog = createBlog
module.exports.updateblog =updateblog
module.exports.deleteById = deleteById
module.exports.deleteBlogByParam = deleteBlogByParam