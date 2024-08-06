const express = require('express');
const router = express.Router();
const { 
    newStaff, getSingleStaff, getStaff, 
    getStaffCount,updateStaff,deleteStaff
 } = require('../controllers/staffController')

 const { authenticateJWT } = require('../middleware/auth')

 router.route('/staff/count').get(authenticateJWT,getStaffCount)
 router.route('/staff').get(authenticateJWT,getStaff)
 router.route('/staff/new').post(newStaff)
 router.route('/staff/:id').get(authenticateJWT,getSingleStaff)
 router.route('/staff/:id').put(authenticateJWT, updateStaff)
 router.route('/staff/:id').delete(deleteStaff)

 module.exports = router