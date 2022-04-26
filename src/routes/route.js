const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const AssignmentController= require("../controllers/assignmentController")
const memeController = require("../controllers/memeController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.get("/cowin/getByDistrict", CowinController.getDistrictSessions)
router.post("/cowin/getOtp", CowinController.getOtp)
router.post("/createMeme", memeController.createMeme )


router.get("/getSortedCities", AssignmentController.getSortedCities)


module.exports = router;