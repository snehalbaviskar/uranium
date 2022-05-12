const express = require('express');
const router = express.Router();

const usercontrollers = require("../controllers/userController")
const bookControllers = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const {authentication, authorization} = require("../middleware/auth")



//user API
router.post("/register", usercontrollers.createUser )
router.post("/login", usercontrollers.loginUser)

//book API
router.post("/books", authentication, authorization, bookControllers.createBook )
router.get("/books", authentication, bookControllers.getFilteredBooks)
router.get("/books/:bookId", authentication, bookControllers.getBookById)
router.put("/books/:bookId", authentication, authorization, bookControllers.updateBookDetails)
router.delete("/books/:bookId", authentication, authorization, bookControllers.deleteBooks)

//review api
router.post("/books/:bookId/review", reviewController.review)
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)


module.exports = router;