// routes/doctor.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const doctorSchema = require('../validators/doctorValidator');

// Get all doctor 
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

// Get the total number of doctor
router.get('/count', async (req, res) => {
    try {
        const doctorCount = await Doctor.count();
        res.status(200).json({ count: doctorCount });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Get a single doctor by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            res.status(200).json({doctor});
        } else {
            res.status(404).json({ error: 'doctor not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new doctor
router.post('/', async (req, res) => {
    // Validate the request body
    const { error } = doctorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }

    const { name, email, gender, mobile_number, practice, specialization } = req.body;
    try {
        const doctor = await Doctor.create({
            name,
            email,
            gender,
            mobile_number,
            practice,
            specialization,
        });
        res.status(201).json({
            status: 'success',
            data: doctor,
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});
// Update a doctor
router.put('/:id', async (req, res) => {
    // Validate the request body
    const { error } = doctorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', error: error.details[0].message });
    }

    const { id } = req.params;
    const { name, email, gender, mobile_number, practice, specialization } = req.body;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            await doctor.update({
                name,
                email,
                gender,
                mobile_number,
                practice,
                specialization,
            });
            res.status(200).json({
                status: 'success',
                data: doctor,
            });
        } else {
            res.status(404).json({ status: 'error', error: 'doctor  not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Delete a doctor 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            await doctor.destroy();
            res.status(200).json({ message : "doctor  deleted" });
        } else {
            res.status(404).json({ error : 'doctor  not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});


module.exports = router;