const express = require('express');
const router = express.Router();

const usercontrollers = require("../controllers/userController")
const bookControllers = require("../controllers/bookController")
const {authentication, authorization} = require("../middleware/auth")



//user API
router.post("/register", usercontrollers.createUser )
router.post("/login", usercontrollers.loginUser)

//book API
router.post("/books", bookControllers.createBook )
router.get("/books", bookControllers.getFilteredBooks)
router.get("/books/:bookId", bookControllers.getBookById)




module.exports = router;