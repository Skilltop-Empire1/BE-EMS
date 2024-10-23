const express = require("express");

const staffController = require("../controllers/staffController");
const router = express.Router();

// General routes
router.post('/create', staffController.createStaff);
router.get('/view/:staffId', staffController.viewStaff);
router.put('/edit/:staffId',staffController.editStaff);
router.delete('/delete/:staffId',staffController.deleteStaff);
router.get('/search',staffController.searchStaff);





//Routes for doctors
router.get('/doctor/all', staffController.allDoctors);


//Routes for nurses
router.get('/nurses/all', staffController.allNurses);



// router.route("/list").get(staff.staffClass.staffDisplay);
// router.route("/count").get(staff.staffClass.staffCount); // Changed to GET for consistency
// router.route("/edit").put(staff.staffClass.staffEdit);
// router.route("/delete").delete(staff.staffClass.deleteStaff);
// router.route("/search").get(staff.staffClass.searchStaff);



module.exports = router;
