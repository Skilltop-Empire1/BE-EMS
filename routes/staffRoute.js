const express = require("express");

const staffController = require("../controllers/staffController");
const router = express.Router();
const loginJWTAthentication = require('../middlewares/auth')

// General routes
router.post('/create',loginJWTAthentication, staffController.createStaff);
router.get('/view/:staffId', staffController.viewStaff);
router.put('/edit/:staffId',staffController.editStaff);
router.delete('/delete/:staffId',staffController.deleteStaff);
router.get('/search',staffController.searchStaff);
router.post('/signIn',staffController.signIn);




// get all doctors
router.get('/doctor/all', staffController.allDoctors);


//get all  nurses
router.get('/nurses/all', staffController.allNurses);


//Routes For Admin
router.post('/invite' ,staffController.inviteStaff);


module.exports = router;
