// const express = require('express');
// const router = express.Router();

// const { getNurses, getNurseCount, getSingleNurse,
//     newNurse, updateNurse, deleteNurse } = require('../controllers/nurseController')
//     const { authenticateJWT } = require('../middleware/auth')
    
//     router.route('/nurse').get(authenticateJWT,getNurses)
//     router.route('/nurse/:id').get(authenticateJWT,getSingleNurse)
//     router.route('/nurse/count').get(authenticateJWT, getNurseCount)
//     router.route('/nurse/new').post(newNurse)
//     router.route('/nurse/:id').put(authenticateJWT, updateNurse)
//     router.route('/nurse/:id').delete(deleteNurse)

//     module.exports = router