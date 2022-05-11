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
router.post("/books", bookControllers.createBook )
router.get("/books", bookControllers.getFilteredBooks)
router.get("/books/:bookId", bookControllers.getBookById)
router.put("/books/:bookId", bookControllers.updateBookDetails)
router.delete("/books/:bookId", bookControllers.deleteBooks)
router.post("/books/:bookId/review", reviewController.review)


module.exports = router;