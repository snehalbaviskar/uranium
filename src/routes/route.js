const express = require('express');

const router=express.Router();
const allControlls=require("../controllers/allController")



router.post('/createNewAuthor',allControlls.createNewAuthor)
router.post('/createNewBook',allControlls.createNewBook)
router.get("/allBooks",allControlls.allBooks)
router.get("/updateBookPrice",allControlls.updateBookPrice)
router.get('/authorsName',allControlls.authorsName)



module.exports = router;