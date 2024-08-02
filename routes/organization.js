// routes/organization.js

const express = require('express');
const router = express.Router();
const Organization = require('../models/organization');
const organizationSchema = require('../validators/organizationValidator');


// Get all organizations
router.get('/', async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get the total number of staff
router.get('/count', async (req, res) => {
    try {
        const organizationCount = await Organization.count();
        res.status(200).json({ count: organizationCount });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Get a single organization by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const organization = await Organization.findByPk(id);
        if (organization) {
            res.status(200).json(organization);
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new organization
router.post('/', async (req, res) => {
    // Validate the request body
    const { error } = organizationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }
    const { name, email, gender, mobile_number, address, city, state, zip_code } = req.body;
    try {
        const organization = await Organization.create({
            name,
            email,
            mobile_number,
            address,
            city,
            state,
            zip_code,
        });
        res.status(201).json(organization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update an organization by ID
router.put('/:id', async (req, res) => {
    // Validate the request body
    const { error } = organizationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }
    const { id } = req.params;
    const { name, email, mobile_number, address, city, state, zip_code } = req.body;

    try {
        const organization = await Organization.findByPk(id);
        if (organization) {
            await organization.update({
                name,
                email,
                mobile_number,
                address,
                city,
                state,
                zip_code,
            });
            res.json(organization);
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an organization by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const organization = await Organization.findByPk(id);
        if (organization) {
            await organization.destroy();
            res.json({ message: 'Organization deleted successfully' });
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
