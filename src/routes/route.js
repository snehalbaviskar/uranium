const express = require('express');
const router = express.Router();

const controllers = require("../controllers/userController")
const controllers1 = require("../controllers/loginController")

router.post("/register", controllers.createUser )
router.post("/login", controllers1.loginUser)



module.exports = router;