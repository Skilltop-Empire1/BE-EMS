//require modules
const express = require("express")
const patient = require("../controllers/patientController")
const upload = require("../middleware/multerMiddleware")

//create express router
const router = express.Router()


//create routes
router.route("/count").post(patient.patientClass.patientCount)
router.route("/create").post(patient.patientClass.createPatient)
router.route("/edit").put(patient.patientClass.patientEdit)
router.route("/delete").delete(patient.patientClass.deletePatient)
router.route('/upload').put(upload.single('file'), patient.patientClass.profilePics)

//export module
module.exports = router


// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file, req.body)