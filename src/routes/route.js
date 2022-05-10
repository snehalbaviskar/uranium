const express = require('express');
const router = express.Router();

const usercontrollers = require("../controllers/userController")
const bookControllers = require("../controllers/bookController")


//user API
router.post("/register", usercontrollers.createUser )
router.post("/login", usercontrollers.loginUser)

//book API
router.post("/books", bookControllers.createBook )




module.exports = router;