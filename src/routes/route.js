const express = require('express');
const router = express.Router();
const AuthorController = require("../controller/authorController")
const BlogController = require('../controller/blogController')


router.post('/createAuthor', AuthorController.createAuthor)
router.post('/createBlog', BlogController.createBlog)
router.get('/getblog',BlogController.getblog)
router.put('/updateblog/:blogId', BlogController.updateblog)
router.delete('/deleteById/:blogId', BlogController.deleteById)
router.delete('/deleteBlogByParam', BlogController.deleteBlogByParam)



// router.get('/filterblog', BlogController.filterblog)




module.exports = router;