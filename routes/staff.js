// routes/staff.js

const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
const staffSchema = require('../validators/staffValidator');

// Get all staff members
router.get('/', async (req, res) => {
    try {
        const staffMembers = await Staff.findAll();
        res.status(200).json(staffMembers);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

// Get the total number of staff
router.get('/count', async (req, res) => {
    try {
        const staffCount = await Staff.count();
        res.status(200).json({ count: staffCount });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Get a single staff member by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const staffMember = await Staff.findByPk(id);
        if (staffMember) {
            res.status(200).json({staffMember});
        } else {
            res.status(404).json({ error: 'Staff member not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new staff member
router.post('/', async (req, res) => {
    // Validate the request body
    const { error } = staffSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }

    const { name, email, gender, mobile_number, practice, specialization } = req.body;
    try {
        const staffMember = await Staff.create({
            name,
            email,
            gender,
            mobile_number,
            practice,
            specialization,
        });
        res.status(201).json({
            status: 'success',
            data: staffMember,
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});
// Update a staff member
router.put('/:id', async (req, res) => {
    // Validate the request body
    const { error } = staffSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }

    const { id } = req.params;
    const { name, email, gender, mobile_number, practice, specialization } = req.body;
    try {
        const staffMember = await Staff.findByPk(id);
        if (staffMember) {
            await staffMember.update({
                name,
                email,
                gender,
                mobile_number,
                practice,
                specialization,
            });
            res.status(200).json({
                status: 'success',
                data: staffMember,
            });
        } else {
            res.status(404).json({ status: 'error', error: 'Staff member not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Delete a staff member
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const staffMember = await Staff.findByPk(id);
        if (staffMember) {
            await staffMember.destroy();
            res.status(200).json({ message : "Staff member deleted" });
        } else {
            res.status(404).json({ error : 'Staff member not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});


module.exports = router;





