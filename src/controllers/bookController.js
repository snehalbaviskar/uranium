const bookModel = require("../models/bookModel")

const { checkData, validTitle, validString, validMobileNum, validEmail, validPwd} = require("../validator/validation")

const createBook= async function (req, res) {
    try{
    let data= req.body

    if(checkData(data)) return res.status(400).send({status: false, message: "Enter Books Details"})

    
    if(!data.title) return res.status(400).send({status: false, message: "Title is required"})
    if(!data.excerpt) return res.status(400).send({status: false, message: "Excerpt is required"})
    if(!data.userId) return res.status(400).send({status: false, message: "UserId is required"})
    if(!data.ISBN) return res.status(400).send({status: false, message: "ISBN is required"})
    if(!data.category) return res.status(400).send({status: false, message: "category is required"})
    if(!data.subcategory) return res.status(400).send({status: false, message: "subcategory is required"})
    if(!data.releasedAt) return res.status(400).send({status: false, message: "releasedAt is required"})
    

    let bookData= await bookModel.create(data)
    res.status(201).send({status: true, message: "Books created successfully", data: bookData})
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

module.exports = {createBook}