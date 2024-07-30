const express = require('express');
const { getSettings, updateSettings, updateAdminSettings } = require('../controllers/settingController');
const {auth,isAdmin} = require('../middlewares/auth');
const router = express.Router();

router.get('/settings',auth, getSettings);
router.put('/settings',auth, updateSettings);
router.put('/admin/settings',isAdmin, updateAdminSettings);



module.exports = router;
