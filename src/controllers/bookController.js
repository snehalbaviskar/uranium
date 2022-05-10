const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")

const { checkData, validString, isValidObjectId} = require("../validator/validation")

const createBook= async function (req, res) {
    try{
    let data= req.body

    if(checkData(data)) return res.status(400).send({status: false, message: "Enter Books Details"})

    //check the value is present or not
    if(!data.title) return res.status(400).send({status: false, message: "Book Title is required"})
    if(!data.excerpt) return res.status(400).send({status: false, message: "Excerpt is required"})
    if(!data.userId) return res.status(400).send({status: false, message: "UserId is required"})
    if(!data.ISBN) return res.status(400).send({status: false, message: "ISBN is required"})
    if(!data.category) return res.status(400).send({status: false, message: "category is required"})
    if(!data.subcategory) return res.status(400).send({status: false, message: "subcategory is required"})

    //check the userId in model
    
    let availableUserId = await userModel.findById(data.userId)
    console.log(availableUserId)
    if (!availableUserId) {
      return res.status(404).send({ status: false, message: "User not found" })
    }

    //validate title, excerpt, category,subcategory
    if(validString(data.title) || validString(data.excerpt) || validString(data.category) || validString(data.subcategory)){
        return res.status(400).send({status: false, message: "data should not contain Numbers its only contains Characters"})
    }
    
    //check title and isbn is unique or not
    let checkUniqueValues = await bookModel.findOne({$or: [{title: data.title}, {ISBN: data.ISBN}]})
    if(checkUniqueValues) return res.status(400).send({status: false, message: "Title or ISBN is already exist"})

    //set date in releasedAt
    let releasedAtTime = new Date()
    data.releasedAt = releasedAtTime.getFullYear() + "-" + (releasedAtTime.getMonth() + 1) + "-" + releasedAtTime.getDate()
    

    //create book data
    let bookData= await bookModel.create(data)
    res.status(201).send({status: true, message: "Books created successfully", data: bookData})
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

const getFilteredBooks = async (req, res) => {
    try{
    let data = req.query;

    if (data.hasOwnProperty('userId')) {
      if (!isValidObjectId(data.userId)) return res.status(400).send({ status: false, message: "Enter a valid user id" });
      let { ...tempData } = data;
      delete (tempData.userId);
      let checkValues = Object.values(tempData);

      if (validString(checkValues)) return res.status(400).send({ status: false, message: "Filter data should not contain numbers excluding user id" })
    } else {
      let checkValues = Object.values(data);

      if (validString(checkValues)) return res.status(400).send({ status: false, message: "Filter data should not contain numbers excluding user id" })
    }

    if (checkData(data)) {
      let getBooks = await bookModel.find({ isDeleted: false }).sort({ title: 1 }).select({ title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 });

      if (getBooks.length == 0) return res.status(404).send({ status: false, message: "No books found" });
      return res.status(200).send({ status: true, message: "Books list", data: getBooks });
    }

    data.isDeleted = false;

    let getFilterBooks = await bookModel.find(data).sort({ title: 1 }).select({ title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 });

    if (getFilterBooks.length == 0) return res.status(404).send({ status: false, message: "No books found" });

    res.status(200).send({ status: true, message: "Books list", data: getFilterBooks });

    }catch(err){
        return res.status(500).send({status: false, Error: err.message})
    }
} 

module.exports = {createBook, getFilteredBooks}

