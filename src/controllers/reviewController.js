const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const { checkData, isValidObjectId, validString} = require("../validator/validation")

const review = async function (req, res) {
     try{
      let data = req.body
      let bookId = req.params.bookId
        if(!isValidObjectId(bookId)) return res.status(400).send({status: false, message: "Enter a valid book id"})

        let findBook = await bookModel.findOne({_id:bookId})
         if(!findBook) return res.status(404).send({status:false, message:"book Id not found"})  
         
         if(findBook.isDeleted == true) return res.status(404).send({status: false, message: "Book is already deleted"})
         if(!data.rating) return res.status(400).send({status: false, message: "Rating is required and should not be 0"})

        if(validString(data.reviewedBy)) return res.status(400).send({status: false, message: " reviewedby name should not contain number"})
        if(validString(data.review)) return res.status(400).send({status: false, message: "review name should not contain number"})

        if(!validString(data.rating)) return res.status(400).send({status: false, message: "Rating should be in numbers"})
        if(!((data.rating < 6) && (data.rating > 0))) return res.status(400).send({status: false, message: "Rating should be between 1-5 numbers"})
        
         //data.bookId = bookId
      
        
        
        if(checkData(data)) return res.status(400).send({status: false, message: "Data is required to add review to book"})
         const  review = await reviewModel.create(data)  
          const count = await bookModel.findByIdAndUpdate({_id:bookId}, {$inc:{ reviews:1}})
           return res.status(201).send({status:true, message: "review added successfully", data:review})
      }
     catch (err) {
     res.status(500).send({status: false,Error: err.message})
     }
}

module.exports = {review}