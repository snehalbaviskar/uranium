const express = require('express');
const router = express.Router();

const {createUser, loginUser} = require("../controllers/userController")
const {createBook, getFilteredBooks, getBookById , updateBookDetails, deleteBooks } = require("../controllers/bookController")
const {review, updateReview, deleteReview } = require("../controllers/reviewController")
const {authentication, authorization} = require("../middleware/auth")



//user API
router.post("/register", createUser )
router.post("/login", loginUser)

//book API
router.post("/books", authentication, authorization, createBook )
router.get("/books", authentication, getFilteredBooks)
router.get("/books/:bookId",authentication, getBookById)
router.put("/books/:bookId",authentication, authorization,  updateBookDetails)
router.delete("/books/:bookId", authentication, authorization, deleteBooks)

//review api
router.post("/books/:bookId/review", review)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)


module.exports = router;