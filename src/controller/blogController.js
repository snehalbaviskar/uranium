const { default: mongoose } = require('mongoose');
const blogModel = require('../models/blogModel');

// const isValidObjectId =function(Id){
//     return mongoose.Types.ObjectId.isValid(Id)
// }



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



// Create a blog document from request body. Get authorId in request body only.

// Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

// Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

// Create atleast 5 blogs for each author

// Return HTTP status 400 for an invalid request with a response body like 






const createBlog = async function(req,res){
    try{
    let data = req.body
    
    let {title, body, authorId, category}= data

    if(!isValid(title))
    return res.status(400).send({status:false, msg : "title is not exist"})

    if(!isValid(body))
    return res.status(400).send({status:false, msg : "body is is not exist"})

    if(!authorId)
    return res.status(400).send({status:false, msg:"author Id is not exist"})

    if(!isValid(category))
    return res.status(400).send({status:false, msg:"category is not exist"})

    let blogCreated = await blogModel.create(data)
    res.status(201).send({data : blogCreated})
    }
    catch(err){
        res.status(500).send({msg:"Error", error:err.message})
    }
    
}




// Returns all blogs in the collection that aren't deleted and are published
// Return the HTTP status 200 if any documents are found. The response structure should be like this
// If no documents are found then return an HTTP status 404 with a response like this
// Filter blogs list by applying filters. Query param can have any combination of below filters.
// By author Id
// By category
// List of blogs that have a specific tag
// List of blogs that have a specific subcategory.


const getblog = async function(req,res){
   
    try{

    let data = req.query
    let {authorId , category, subcategory, tags} =data

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
    res.status(404).send({status:false, msg:"no such document exist or it may be deleted"})
    
    res.status(200).send({status:true, data: blogs})
}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}

}



// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.



const updateblog = async function (req, res) {
    try{  
        let data =  req.body; 
        let blogId = req.params.blogId;
        let {tags, subcategory, title, body}= data
       
        if(tags){if(!isValid(tags))
            return res.status(400).send({status:false, msg : "tags is not exist"})}


    if(!isValid(subcategory))
    return res.status(400).send({status:false, msg : "subcategory is not exist"})

    if(!isValid(title))
    return res.status(400).send({status:false, msg : "title is not exist"})

    if(!isValid(body))
    return res.status(400).send({status:false, msg : "body is not exist"})
        
        let blog = await blogModel.findById(blogId)
        
        if(!blog){
        return res.status(404).send("No such document exists");
        }
  
        if(blog.isDeleted){
        return res.status(400).send({ status: false, msg: "Blog not found, may be it is deleted" })
        }
      let updatedblog = await blogModel.findByIdAndUpdate({ _id: blogId },{ $addToSet :{tags : tags, subcategory : subcategory} , $set : {title : title , body : body, publishedAt: Date.now()}},{new:true});
  
        res.status(201).send({ msg: "Successfully updated", data: updatedblog });
    }
    catch (err){
        res.status(500).send({ msg: "Error", error: err.message })
    }
  }


//   Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

const deleteById =async function(req,res){

    try{
    let blogId  =req.params.blogId

   
    let blog = await blogModel.findOne({$and:[{_id:blogId},{isDeleted:false}]})
  
    if(!blog)
    res.status(404).send({status:false, msg: "No such blog exist or the blog is deleted"})

    if(blog.isDeleted==true)
    return res.status(404).send({status:false, msg: "No such blog exist or the blog is deleted"})

    let afterDeletion =await blogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new:true})
    
    res.status(200).send({status:true, data:afterDeletion})
}
catch(err){
    res.status(500).send({msg:"Error", error:err.message})
}

}


// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

const deleteBlogByParam = async function (req, res) {
    try{
        let category = req.query.category
        let authorId = req.query.authorId
        let tags = req.query.tags
        let subcategory = req.query.subcategory

        let fetchdata = await blogModel.find({$or:[{category: category  },{tags: tags},{subcategory: subcategory}, { authorId: authorId }]})

        if(fetchdata.length == 0){
            res.status(404).send({ status: false, msg: " Blog document doesn't exist "})
        }

        let deletedtedUser = await blogModel.findOneAndUpdate({$or:[{category: category  },{tags: tags},{subcategory: subcategory},{isPublished: true}, { authorId: authorId }]}, { $set: { isDeleted: true } }, { new: true });

        res.status(200).send({ msg: "done", data: deletedtedUser });
    }
    catch(err){
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports.getblog = getblog
module.exports.createBlog = createBlog
module.exports.updateblog =updateblog
module.exports.deleteById = deleteById
module.exports.deleteBlogByParam = deleteBlogByParam