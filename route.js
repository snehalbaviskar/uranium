const express=require('express')
const router=express.Router()
const controller=require("./controller.js")

router.post("/api/student",controller.createStudentData)
router.get("/api/student",controller.getStudent)
router.get("/api/student/:id",controller.getStudents)
router.put("/api/student/:id",controller.updateStudent)
router.delete("/api/student/:id",controller.deleteStudent)
router.delete("/api/student",controller.deleteAllStudent)
router.get("/api/students",controller.getStudentname)

module.exports = router;