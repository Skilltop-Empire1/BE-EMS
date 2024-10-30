const express = require("express");
const patient = require("../controllers/patientController");
const loginJWTAthentication = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

//create express router
const router = express.Router();



/**
 * @swagger
 * /api/v1/patient/list:
 *   get:
 *     summary: Retrieve a list of patients
 *     description: Retrieve a list of all patients from the database in pagination.
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The patient ID.
 *                     example: 123e4567-e89b-12d3-a456-426614174000
 *                   firstName:
 *                     type: string
 *                     description: The patient's first name.
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     description: The patient's last name.
 *                     example: Doe
 */
router.route("/list").get(/*loginJWTAthentication, checkRole(['Admin', 'Super Admin']),*/patient.patientClass.patientdisplay);

/**
 * @swagger
 * /api/v1/patient/create:
 *   post:
 *     summary: Create a new patient
 *     description: Creates a new patient record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: +123456789
 *               gender:
 *                 type: string
 *                 example: male
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1980-01-01
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               educationQualification:
 *                 type: string
 *                 example: BSc Nursing
 *               organization:
 *                 type: string
 *                 example: XYZ Hospital
 *     responses:
 *       201:
 *         description: Patient created successfully.
 *       400:
 *         description: Invalid input.
 *       409:
 *         description: Patient already exists.
 */
router.route("/create").post(/*loginJWTAthentication, checkRole(['Admin', 'Super Admin']),*/patient.patientClass.createPatient);

/**
 * @swagger
 * /api/v1/patient/count:
 *   post:
 *     summary: Count the number of patients
 *     description: Returns the total number of patients.
 *     responses:
 *       200:
 *         description: The total number of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 100
 */
router.route("/count").post(/*loginJWTAthentication, checkRole(['Admin', 'Super Admin']),*/ patient.patientClass.patientCount);

/**
 * @swagger
 * /api/v1/patient/edit:
 *   put:
 *     summary: Edit a patient's details
 *     description: Updates an existing patient's details based on their id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: +123456789
 *               gender:
 *                 type: string
 *                 example: male
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1980-01-01
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               educationQualification:
 *                 type: string
 *                 example: BSc Nursing
 *               organization:
 *                 type: string
 *                 example: XYZ Hospital
 *     responses:
 *       200:
 *         description: Patient details updated successfully.
 *       404:
 *         description: Patient not found.
 */
router.route("/edit").put(/*loginJWTAthentication, checkRole(['Admin', 'Super Admin']),*/patient.patientClass.patientEdit);

/**
 * @swagger
 * /api/v1/patient/delete:
 *   delete:
 *     summary: Delete a patient's record
 *     description: Deletes a patient's record based on their uuid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4b7e193-cdf7-40cb-8ad2-67e528407d98
 *     responses:
 *       200:
 *         description: Patient record deleted successfully.
 *       404:
 *         description: Patient not found.
 */
router.route("/delete").delete(/*loginJWTAthentication, checkRole(['Admin', 'Super Admin']),*/patient.patientClass.deletePatient);




/**
 * @swagger
 * /api/v1/patient/search:
 *   put:
 *     summary: Search for a patient
 *     description: Search patient base on firstname and surname.
 *     requestBody:
 *       required:true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchParameter:
 *                 type: string
 *                 example: +123456789
 *     responses:
 *       200:
 *         description: Return json objects of the patient list.
 *       404:
 *         description: No patient with the search details found.
 */
router.route("/search").get(/*loginJWTAthentication,checkRole(['Admin', 'Super Admin']),*/patient.patientClass.searchPartient);



module.exports = router;
