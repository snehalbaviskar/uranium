const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const reviewModel = require("../models/reviewModel")




const {checkData,validString,isValidObjectId,validDate} = require("../validator/validation")

////////////////////////////////////////////////////create Book////////////////////////////////////////////////////////////////////

const createBook = async function (req, res) {
  try {
    let data = req.body

    if (checkData(data)) return res.status(400).send({status: false,message: "Enter Books Details"})
    if(isValidObjectId(data)) return res.status(400).send({status: false, message: "Invalid userId"})

    //check the value is present or not
    if (!data.title) return res.status(400).send({status: false,message: "Book Title is required"})
    if (!data.excerpt) return res.status(400).send({status: false,message: "Excerpt is required"})
    if (!data.userId) return res.status(400).send({status: false,message: "UserId is required"})
    if (!data.ISBN) return res.status(400).send({status: false,message: "ISBN is required"})
    if (!data.category) return res.status(400).send({status: false,message: "category is required"})
    if (!data.subcategory) return res.status(400).send({status: false,message: "subcategory is required"})

    //check the userId in model
    let data1 = data.userId
    let availableUserId = await userModel.findOne({_id: data1, isDeleted:false})
    console.log(availableUserId)
    if (!availableUserId) return res.status(404).send({ status: false, message: "User not found" })

    //validate title, excerpt, category,subcategory
    if (validString(data.title) || validString(data.excerpt) || validString(data.category) || validString(data.subcategory)) {
      return res.status(400).send({status: false,message: "data should not contain Numbers its only contains Characters"})}

    //check title and isbn is unique or not
    let checkUniqueValues = await bookModel.findOne({$or: [{title: data.title}, {ISBN: data.ISBN}]})
    if (checkUniqueValues) return res.status(400).send({status: false,message: "Title or ISBN is already exist"})

    //set date in releasedAt
   // data.releasedAt = currentFullDate();
   if(validDate(data.releasedAt)) return res.status(400).send({status: false, message: "enter a valid released date in (YYYY-DD-MM) format"})

    //create book data
    let bookData = await bookModel.create(data)
    res.status(201).send({status: true,message: "Books created successfully",data: bookData})
  } catch (err) {
    res.status(500).send({status: false,Error: err.message})
  }
}

////////////////////////////////////////////////////get Book by query params////////////////////////////////////////////////////////

const getFilteredBooks = async (req, res) => {
  try {
    let data = req.query;

    if (data.hasOwnProperty('userId')) {
      if (!isValidObjectId(data.userId)) return res.status(400).send({status: false,message: "Enter a valid user id"});
      let { ...tempData } = data;
      delete(tempData.userId);
      let checkValues = Object.values(tempData);

      if (validString(checkValues)) return res.status(400).send({status: false,message: "Filter data should not contain numbers excluding user id"})
    } else {
      let checkValues = Object.values(data);

      if (validString(checkValues)) return res.status(400).send({status: false,message: "Filter data should not contain numbers excluding user id"})
    }

    if (checkData(data)) {
      let getBooks = await bookModel.find({isDeleted: false}).sort({title: 1}).select({title: 1,excerpt: 1,userId: 1,category: 1,reviews: 1,releasedAt: 1});

      if (getBooks.length == 0) return res.status(404).send({status: false,message: "No books found"});
      return res.status(200).send({status: true,message: "Books list",data: getBooks});
    }

    data.isDeleted = false;

    let getFilterBooks = await bookModel.find(data).sort({title: 1}).select({title: 1,excerpt: 1,userId: 1,category: 1,reviews: 1, releasedAt: 1});

    if (getFilterBooks.length == 0) return res.status(404).send({status: false,message: "No books found"});

    res.status(200).send({status: true,message: "Books list",data: getFilterBooks});

  } catch (err) {
    return res.status(500).send({status: false,Error: err.message})
  }
}

/////////////////////////////////////////////////////////////get Book by path params//////////////////////////////////////////////////

const getBookById = async (req, res) => {
  try {
    let bookId = req.params.bookId
    if (!isValidObjectId(bookId)) return res.status(400).send({status: false,message: "Enter a correct book id" })
    let getBook = await bookModel.findById(bookId).select({__v: 0})
    if (!getBook) return res.status(404).send({status: false,message: "No Book found"})

    if(getBook.isDeleted == true) return res.status(404).send({ status: false, message: "Book not found or have already been deleted" })

    let getReviews = await reviewModel.find({ bookId: getBook._id, isDeleted: false }).select({ isDeleted: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    getBook._doc.reviewsData = getReviews

    res.status(200).send({ status: true, message: "Books list", data: getBook })
  } catch (err) {
    return res.status(500).send({status: false,Error: err.message})
  }

}

/////////////////////////////////////////////////////////update books by path prams/////////////////////////////////////////////////////////

const updateBookDetails = async function (req, res) {
  try {
    const bookId = req.params.bookId

    if (!bookId) return res.status(400).send({status: false,message: "userId not Exist"})

    let searchBook = await bookModel.findOne({_id: bookId})
    if (!searchBook) return res.status(404).send({status: false,message: `Book does not exist by this ${bookId}.`})

    if(searchBook.isDeleted == true) return res.status(404).send({status: false, message: "Data already deleted"})
    
    const data = req.body
    if (checkData(data)) return res.status(400).send({status: false,message: "Data is required for update the document"})

    if(data.hasOwnProperty('title') || data.hasOwnProperty('ISBN')){
      let checkTitleAndIsbn = await bookModel.findOne({$or: [{title: data.title}, {ISBN: data.ISBN}]})
      if (checkTitleAndIsbn) return res.status(400).send({status: false,message: "Title or ISBN already exist"})
    }

    if(validString(data.title) || validString(data.excerpt)) return res.status(400).send({status: false, message: "Data should not contain Numbers"})

    if(validDate(data.releasedAt)) return res.status(200).send({status: false, message: "Enter a valid released date in (YYYY-MM-DD format"})

    let changeDetails = await bookModel.findOneAndUpdate({_id: bookId},data, {new: true})
    res.status(200).send({status: true,message: "Successfully updated book details.", data: changeDetails})
  } catch (err) {
    return res.status(500).send({status: false,Error: err.message})
  }
}


///////////////////////////////////////////////////////////delete Book by path params/////////////////////////////////////////////////////////////

const deleteBooks = async (req, res) => {
  try {
          let bookId = req.params.bookId; //collect the data from params 
  
          if (Object.keys(bookId).length == 0) return res.status(404).send({ msg: "bookId is not found" });   //if blogId is not present then it gives the error
  
          let findBook = await bookModel.findById(bookId) //it will find out the bookId 
          if (!findBook) return res.status(404).send({ status: false, message: "Invalid bookId" }) //validate the bookID 
  
          if (findBook.isDeleted == false) {
       let updatedBook = await bookModel.findOneAndUpdate({ _id: findBook._id }, { isDeleted: true, deletedAt: new Date()}, { new: true });
         if(!updatedBook) return res.status(404).send({ status: false, message: "deleted failed"})
        res.status(200).send({ status: true,message: "Deleted Successfully", data: updatedBook })
        }else {return res.status(400).send({status: false, message:"Already Deleted"})}
        
      }
      catch (err) {
          console.log(err)
          res.status(500).send({ status: false, Error: err.message })
      }
  
  }








module.exports = {createBook,getFilteredBooks,getBookById,updateBookDetails, deleteBooks}