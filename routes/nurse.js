// routes/nurse.js

const express = require('express');
const router = express.Router();
const Nurse = require('../models/nurse');
const nurseSchema = require('../validators/nurseValidator');

// Get all nurse 
router.get('/', async (req, res) => {
    try {
        const nurses = await Nurse.findAll();
        res.status(200).json(nurses);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

// Get the total number of nurse
router.get('/count', async (req, res) => {
    try {
        const nurseCount = await Nurse.count();
        res.status(200).json({ count: nurseCount });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Get a single nurse by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const nurse = await Nurse.findByPk(id);
        if (nurse) {
            res.status(200).json({nurse});
        } else {
            res.status(404).json({ error: 'nurse not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new nurse
router.post('/', async (req, res) => {
    // Validate the request body
    const { error } = nurseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }

    const { name, email, gender, mobile_number, practice, specialization } = req.body;
    try {
        const nurse = await Nurse.create({
            name,
            email,
            gender,
            mobile_number,
            practice,
            specialization,
        });
        res.status(201).json({
            status: 'success',
            data: nurse,
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});
// Update a nurse
router.put('/:id', async (req, res) => {
    // Validate the request body
    const { error } = nurseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }

    const { id } = req.params;
    const { name, email, gender, mobile_number, practice, specialization } = req.body;
    
    try {
        const nurse = await Nurse.findByPk(id);
        if (nurse) {
            await nurse.update({
                name,
                email,
                gender,
                mobile_number,
                practice,
                specialization,
            });
            res.status(200).json({
                status: 'success',
                data: nurse,
            });
        } else {
            res.status(404).json({ status: 'error', error: 'nurse  not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Delete a nurse 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const nurse = await Nurse.findByPk(id);
        if (nurse) {
            await nurse.destroy();
            res.status(200).json({ message : "nurse  deleted" });
        } else {
            res.status(404).json({ error : 'nurse  not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});


module.exports = router;