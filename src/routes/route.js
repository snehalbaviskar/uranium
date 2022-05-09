const express = require('express');
const router = express.Router();

const controllers = require("../controllers/userController")

router.post("/register", controllers.createUser )



module.exports = router;