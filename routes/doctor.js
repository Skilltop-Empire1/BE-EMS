const express = require('express');
const router = express.Router();

const { getDoctors, getDoctorsCount, getSingleDoctor,
    newDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController')
    const { authenticateJWT } = require('../middleware/auth')
    router.route('/doctor').get(authenticateJWT, getDoctors)
    router.route('/doctor/:id').get(authenticateJWT,getSingleDoctor)
    router.route('/doctor/count').get(authenticateJWT, getDoctorsCount)
    router.route('/doctor/new').post(newDoctor)
    router.route('/doctor/:id').put(authenticateJWT, updateDoctor)
    router.route('/doctor/:id').delete(deleteDoctor)
    
    
    module.exports = router
