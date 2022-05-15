const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const { checkData, isValidObjectId, validString} = require("../validator/validation")

////////////////////////////////////////////////////////////////create review//////////////////////////////////////////////////////////////////

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

        if(data.hasOwnProperty('rating')){
        if(!validString(data.rating)) return res.status(400).send({status: false, message: "Rating should be in numbers"})
        if(!((data.rating < 6) && (data.rating > 0))) return res.status(400).send({status: false, message: "Rating should be between 1-5 numbers"})
        }
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


//////////////////////////////////////////////////////////////updated by path params//////////////////////////////////////////////////////////

const updateReview = async (req, res) => {
     try{
          let bookParams = req.params.bookId;
          let reviewParams = req.params.reviewId
          let requestUpdateBody = req.body
          const { review, rating, reviewedBy } = requestUpdateBody;

          if(!isValidObjectId(bookParams)) return res.status(400).send({status: false, message: "Enter a valid Book id"})
          if(!isValidObjectId(reviewParams)) return res.status(400).send({status: false, message: "Enter a valid Review id"})
          
          if(checkData(requestUpdateBody)) return res.status(400).send({status: false, message: "Data is required to update document"})

          if(validString(requestUpdateBody.reviewedBy) || validString(requestUpdateBody.review)) {
               return res.status(400).send({status: false, message: "reviewedBy and review should not contain number"})
          }

          if(requestUpdateBody.hasOwnProperty('rating')){
          if(!validString(requestUpdateBody.rating)) return res.status(400).send({status: false, message: "Rating should be in numbers"})
          if(!((requestUpdateBody.rating < 6) && (requestUpdateBody.rating > 0))) return res.status(400).send({status: false, message: "Rating should be between 1-5 numbers"})
          }
  
          //finding book and review on which we have to update.
          let searchBook = await bookModel.findById({ _id: bookParams }).select({ createdAt: 0, updatedAt: 0, __v: 0 })
          if (!searchBook) return res.status(404).send({ status: false, message: `Book does not exist by this ${bookParams}. ` })
          let searchReview = await reviewModel.findById({ _id: reviewParams })
          if (!searchReview) return res.status(404).send({status: false,message: `Review does not exist by this ${reviewParams}.` })
  
       //verifying the attribute isDeleted:false or not for both books and reviews documents.
          if (searchBook.isDeleted == false) {
              if (searchReview.isDeleted == false) {
                  let updateReviewDetails = await reviewModel.findOneAndUpdate({ _id: reviewParams }, { review: review, rating: rating, reviewedBy: reviewedBy }, { new: true })
  
                  let destructureForResponse = searchBook.toObject();
                  destructureForResponse['updatedReview'] = updateReviewDetails;
  
                  return res.status(200).send({ status: true, message: "Successfully updated the review of the book.", data: destructureForResponse })
  
              } else {
                  return res.status(400).send({ status: false, message: "Unable to update details Review has been already deleted" })
              }
          } else {
              return res.status(400).send({ status: false, message: "Unable to update details Book has been already deleted" })
          }
     }catch(err){
          res.status(500).send({status: false, Error: err.message})
     }
}

/////////////////////////////////////////////////////////////delete by path prams//////////////////////////////////////////////////////////////

const deleteReview = async function (req, res) {
     try {
         let bookParams = req.params.bookId;
         let reviewParams = req.params.reviewId

         
         if(!isValidObjectId(bookParams)) return res.status(400).send({status: false, message: "Enter a valid Book id"})
         if(!isValidObjectId(reviewParams)) return res.status(400).send({status: false, message: "Enter a valid Review id"})

         //finding book and checking whether it is deleted or not.
         let searchBook = await bookModel.findById({ _id: bookParams, isDeleted: false })
         if (!searchBook) return res.status(400).send({ status: false, message: `Book does not exist by this ${bookParams}.` })
 
         //finding review and checking whether it is deleted or not.
         let searchReview = await reviewModel.findById({ _id: reviewParams })
         if (!searchReview) return res.status(400).send({ status: false, message: `Review does not exist by this ${reviewParams}.` })

         //verifying the attribute isDeleted:false or not for both books and reviews documents.
         if (searchBook.isDeleted == false) {
             if (searchReview.isDeleted == false) {
                 const deleteReviewDetails = await reviewModel.findOneAndUpdate({ _id: reviewParams }, { isDeleted: true, deletedAt: new Date() }, { new: true })
 
                 if (deleteReviewDetails) {
                     await bookModel.findOneAndUpdate({ _id: bookParams },{$inc:{ reviews: -1 }})
                 }
                 return res.status(200).send({ status: true, message: "Review deleted successfully.", data: deleteReviewDetails})
 
             } else {
                 return res.status(400).send({ status: false, message: "Unable to delete review details Review has been already deleted" })
             }
         } else {
             return res.status(400).send({ status: false, message: "Unable to delete Book has been already deleted" })
         }
     } catch (err) {
         return res.status(500).send({ status: false, Error: err.message })
     }
 }



module.exports = {review, updateReview, deleteReview}


// const getId = req.params
//          if(findBook.isDeleted == true) return res.status(404).send({status: false, message: "Data already deleted you cant upadated"})