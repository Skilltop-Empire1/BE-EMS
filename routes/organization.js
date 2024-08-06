const express = require('express');
const router = express.Router();

const {
    getOrganizations, getSingleOrganization, newOrganization, updateOrganization,
    deleteOrganization, getOrganizationsCount
} = require('../controllers/organizationController')

const {authenticateJWT} = require('../middleware/auth')

router.route('/organization').get(getOrganizations)
router.route('/organization/:id').get(getSingleOrganization)
router.route('/organization/count').get(getOrganizationsCount)
router.route('/organization/new').post(authenticateJWT, newOrganization)
router.route('/organization/:id').put(updateOrganization)
router.route('/organization/:id').delete(deleteOrganization)


module.exports = router