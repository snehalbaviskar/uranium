const { findOne } = require("../models/bookModel")
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const validation = require("../validator/validation")

const review = async function (req, res) {
     try{
        let data = req.body
        let bookId = req.params.bookId
        const findBook = await bookModel.findOne({_id:bookId, isDeleted: false})
         if(!findBook){ 
             return res.status(404).send({status:false, message:"book Id not found"})  
         }      
         const review = await reviewModel.create(data)  
         const count = await bookModel.findOneAndUpdate({_id:bookId, isDeleted: false }, {$inc:{ reviews:1}})
           return res.status(201).send({status:true, message: "review added successfully", data:review})
        }
       catch (err) {
       res.status(500).send({status: false,Error: err.message})

      }
}

module.exports = {review}