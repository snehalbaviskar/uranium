const express = require('express');
const router = express.Router();
const AuthorController = require("../controller/authorController")
const BlogController = require('../controller/blogController')


router.post('/createAuthor', AuthorController.createAuthor)
router.post('/createBlog', BlogController.createBlog)




module.exports = router;