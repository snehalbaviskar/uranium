const studentModel = require('./model.js');


//======================= Create student Document====================//

let createStudentData = async function (req, res) {
    try {
        let data = req.body

        let studentData = await studentModel.create(data)
        res.status(201).send({ status: true, msg: "student data created successfully", data: studentData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

//======================= get student Document====================//

let getStudent = async function (req, res) {
  try {
    //const data = req.query;
   
      let student = await studentModel.find({ $and: [{ isDeleted: false }] });
     
      return res.status(200).send({ status: true, list: student });
    }
   catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};


//======================= get student Document by Id====================//
const getStudents = async (req, res) => {
    try {
      let studentId = req.params.id
      console.log(studentId)
      let studtId = await studentModel.findById({ _id:studentId, isDeleted: false });
  
      res.status(200).send({ status: true, message: "student list", data:studtId })
    } catch (err) {
      return res.status(500).send({status: false,Error: err.message})
    }

    }

//======================= update student Document====================//
    const updateStudent = async function (req, res) {
      try {
          const studentID = req.params.id
          let studentData = req.body;
  
  
          let updatedstudent = await studentModel.findOneAndUpdate({ _id: studentID ,isDeleted:false}, studentData, { new: true });
         
          res.status(200).send({status:true, message:"student updated Successfully" , data: updatedstudent })
      }
  
      catch (err) {
          console.log("this is the error:", err.message)
          return res.status(500).send({ msg: "error", error: err.message })
      }
  }
  

//======================= get student Document====================//
  let getStudentname = async function (req, res) {
    try {
      const data = req.query;
     
       const regexName= new RegExp(data.Name, "i")
   
        const student = await studentModel.find({ $and: [{ isDeleted: false }, {name:{$regex:regexName}}] });
       
        return res.status(200).send({ status: true, list: student });
      }
     catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };
  
//======================= delete student Document====================//
  const deleteStudent = async function (req, res) {
    try {
        const studentID = req.params.id
      let deletestudent = await studentModel.findOneAndUpdate({ _id: studentID},{isDeleted:true});
       
        res.status(200).send({status:true, message:"student data deleted Successfully"})
    }

    catch (err) {
        console.log("this is the error:", err.message)
        return res.status(500).send({ msg: "error", error: err.message })
    }
}


//======================= delete all student Document ====================//
const deleteAllStudent = async function (req, res) {
  try {
   
    let deletestudent = await studentModel.updateMany({isDeleted:True});
     
      res.status(200).send({status:true, message:"all student data deleted  Successfully"})
  }

  catch (err) {
      console.log("this is the error:", err.message)
      return res.status(500).send({ msg: "error", error: err.message })
  }
}



module.exports={createStudentData, getStudent, getStudents,updateStudent, getStudentname,deleteStudent,deleteAllStudent}


