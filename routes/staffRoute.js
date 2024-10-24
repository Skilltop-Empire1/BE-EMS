const express = require("express");
const staffController = require("../controllers/staffController");
const router = express.Router();
const loginJWTAthentication = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const chekPerm = require('../middlewares/permissionMiddleware')

/**
 * @swagger
 * tags: 
 *   name: Staff
 *   description: Staff management API
 */

/**
 * @swagger
 * /staff/create:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the staff member
 *               email:
 *                 type: string
 *                 description: Email of the staff member
 *               role:
 *                 type: string
 *                 description: Role of the staff member
 *               departmentName:
 *                 type: string
 *                 description: Department of the staff member
 *               specialization:
 *                 type: string
 *                 description: Specialization of the staff member
 *               shiftSchedule:
 *                 type: string
 *                 description: Shift schedule of the staff member
 *               employStatus:
 *                 type: string
 *                 description: Employment status of the staff member
 *               location:
 *                 type: string
 *                 description: Location or residence of the staff member
 *               dateOfHire:
 *                 type: string
 *                 format: date
 *                 description: Date of hire of the staff member
 *               yrOfExperience:
 *                 type: string
 *                 description: Years of experience of the staff member
 *               phone:
 *                 type: string
 *                 description: Phone number of the staff member
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the staff member
 *               gender:
 *                 type: string
 *                 description: Gender of the staff member
 *               licence:
 *                 type: number
 *                 description: License information of the staff member 
 *                 example : 22229293938
 *               educationalQualification:
 *                 type: string
 *                 description: Educational qualification of the staff member
 *     responses:
 *       201:
 *         description: Saved Values in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staffId:
 *                     type: string
 *                     description: The staff ID.
 *                     example: d8e6dc7a-7e7f-4873-8b02-5fe540ea7a6a
 *                   staffStatus:
 *                     type: string
 *                     description: The staff's status.
 *                     example: Registered
 *                   firstName:
 *                     type: string
 *                     description: The staff's first name.
 *                     example: Doe
 *                   lastName:
 *                     type: string
 *                     description: The staff's last name.
 *                     example: Clarkson
 *                   role:
 *                     type: string
 *                     description: The staff's role.
 *                     example: Doctor
 *                   departmentName:
 *                     type: string
 *                     description: The staff's department name.
 *                     example: Gynecology
 *                   specialization:
 *                     type: string
 *                     description: The staff's specialization.
 *                     example: Pediatrician
 *                   shiftSchedule:
 *                     type: string
 *                     description: The staff's shift schedule.
 *                     example: Day Shift
 *                   employStatus:
 *                     type: string
 *                     description: The staff's employment status.
 *                     example: Active
 *                   location:
 *                     type: string
 *                     description: The staff's location.
 *                     example: New York
 *                   dateOfHire:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of hire.
 *                     example: 2023-01-15
 *                   phone:
 *                     type: string
 *                     description: The staff's phone number.
 *                     example: +1234567890
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of birth.
 *                     example: 1990-05-20
 *                   gender:
 *                     type: string
 *                     description: The staff's gender.
 *                     example: Female
 *                   licence:
 *                     type: number
 *                     description: The staff's licence.
 *                     example: 2282923938
 *                   educationalQualification:
 *                     type: string
 *                     description: The staff's educational qualification.
 *                     example: Master's Degree
 *                   profileUrl:
 *                     type: string
 *                     description: The staff's profile URL.
 *                     example: http://example.com/profile/1
 *                   password:
 *                     type: string
 *                     description: The staff's password.
 *                     example: password123
 *                   vacationDays:
 *                     type: string
 *                     description: The staff's vacation days.
 *                     example: 15
 *                   permission:
 *                     type: string
 *                     description: The staff's permissions.
 *                     example: Full Access
 *       404:
 *         description: Invalid input or missing required field
 */
router.post('/create', loginJWTAthentication, checkRole(['Admin', 'Super Admin']),chekPerm(['Staff','create']), staffController.createStaff);
/**
 * @swagger
 * /staff/view/{staffId}:
 *   get:
 *     summary: View a specific staff member by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the staff member
 *     responses:
 *       201:
 *         description: Saved Values in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staffId:
 *                     type: string
 *                     description: The staff ID.
 *                     example: d8e6dc7a-7e7f-4873-8b02-5fe540ea7a6a
 *                   staffStatus:
 *                     type: string
 *                     description: The staff's status.
 *                     example: Registered
 *                   firstName:
 *                     type: string
 *                     description: The staff's first name.
 *                     example: Doe
 *                   lastName:
 *                     type: string
 *                     description: The staff's last name.
 *                     example: Clarkson
 *                   role:
 *                     type: string
 *                     description: The staff's role.
 *                     example: Doctor
 *                   departmentName:
 *                     type: string
 *                     description: The staff's department name.
 *                     example: Gynecology
 *                   specialization:
 *                     type: string
 *                     description: The staff's specialization.
 *                     example: Pediatrician
 *                   shiftSchedule:
 *                     type: string
 *                     description: The staff's shift schedule.
 *                     example: Day Shift
 *                   employStatus:
 *                     type: string
 *                     description: The staff's employment status.
 *                     example: Active
 *                   location:
 *                     type: string
 *                     description: The staff's location.
 *                     example: New York
 *                   dateOfHire:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of hire.
 *                     example: 2023-01-15
 *                   phone:
 *                     type: string
 *                     description: The staff's phone number.
 *                     example: +1234567890
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of birth.
 *                     example: 1990-05-20
 *                   gender:
 *                     type: string
 *                     description: The staff's gender.
 *                     example: Female
 *                   licence:
 *                     type: number
 *                     description: The staff's licence.
 *                     example: 2282923938
 *                   educationalQualification:
 *                     type: string
 *                     description: The staff's educational qualification.
 *                     example: Master's Degree
 *                   profileUrl:
 *                     type: string
 *                     description: The staff's profile URL.
 *                     example: http://example.com/profile/1
 *                   password:
 *                     type: string
 *                     description: The staff's password.
 *                     example: password123
 *                   vacationDays:
 *                     type: string
 *                     description: The staff's vacation days.
 *                     example: 15
 *                   permission:
 *                     type: string
 *                     description: The staff's permissions.
 *                     example: Full Access
 *       404:
 *         description: Invalid input or missing required field
 */
router.get('/view/:staffId', loginJWTAthentication,chekPerm(['Staff','view']), staffController.viewStaff);
/*
 * @swagger
 * /staff/edit/{staffId}:
 *   put:
 *     summary: Edit a staff member's details
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the staff member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the staff member
 *               email:
 *                 type: string
 *                 description: Email of the staff member
 *               role:
 *                 type: string
 *                 description: Role of the staff member
 *               departmentName:
 *                 type: string
 *                 description: Department of the staff member
 *               specialization:
 *                 type: string
 *                 description: Specialization of the staff member
 *               shiftSchedule:
 *                 type: string
 *                 description: Shift schedule of the staff member
 *               employStatus:
 *                 type: string
 *                 description: Employment status of the staff member
 *               location:
 *                 type: string
 *                 description: Location or residence of the staff member
 *               dateOfHire:
 *                 type: string
 *                 format: date
 *                 description: Date of hire of the staff member
 *               yrOfExperience:
 *                 type: string
 *                 description: Years of experience of the staff member
 *               phone:
 *                 type: string
 *                 description: Phone number of the staff member
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the staff member
 *               gender:
 *                 type: string
 *                 description: Gender of the staff member
 *               licence:
 *                 type: number
 *                 description: License information of the staff member 
 *                 example : 22229293938
 *               educationalQualification:
 *                 type: string
 *                 description: Educational qualification of the staff member
 *     responses:
 *       201:
 *         description: Saved Values in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staffId:
 *                     type: string
 *                     description: The staff ID.
 *                     example: d8e6dc7a-7e7f-4873-8b02-5fe540ea7a6a
 *                   staffStatus:
 *                     type: string
 *                     description: The staff's status.
 *                     example: Registered
 *                   firstName:
 *                     type: string
 *                     description: The staff's first name.
 *                     example: Doe
 *                   lastName:
 *                     type: string
 *                     description: The staff's last name.
 *                     example: Clarkson
 *                   role:
 *                     type: string
 *                     description: The staff's role.
 *                     example: Doctor
 *                   departmentName:
 *                     type: string
 *                     description: The staff's department name.
 *                     example: Gynecology
 *                   specialization:
 *                     type: string
 *                     description: The staff's specialization.
 *                     example: Pediatrician
 *                   shiftSchedule:
 *                     type: string
 *                     description: The staff's shift schedule.
 *                     example: Day Shift
 *                   employStatus:
 *                     type: string
 *                     description: The staff's employment status.
 *                     example: Active
 *                   location:
 *                     type: string
 *                     description: The staff's location.
 *                     example: New York
 *                   dateOfHire:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of hire.
 *                     example: 2023-01-15
 *                   phone:
 *                     type: string
 *                     description: The staff's phone number.
 *                     example: +1234567890
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of birth.
 *                     example: 1990-05-20
 *                   gender:
 *                     type: string
 *                     description: The staff's gender.
 *                     example: Female
 *                   licence:
 *                     type: number
 *                     description: The staff's licence.
 *                     example: 2282923938
 *                   educationalQualification:
 *                     type: string
 *                     description: The staff's educational qualification.
 *                     example: Master's Degree
 *                   profileUrl:
 *                     type: string
 *                     description: The staff's profile URL.
 *                     example: http://example.com/profile/1
 *                   password:
 *                     type: string
 *                     description: The staff's password.
 *                     example: password123
 *                   vacationDays:
 *                     type: string
 *                     description: The staff's vacation days.
 *                     example: 15
 *                   permission:
 *                     type: string
 *                     description: The staff's permissions.
 *                     example: Full Access
 *       404:
 *         description: staff not found
 */
router.put('/edit/:staffId', loginJWTAthentication,chekPerm(['Staff','edit']), staffController.editStaff);
/**
 * @swagger
 * /staff/delete/{staffId}:
 *   delete:
 *     summary: Delete a staff member
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the staff member to delete
 *     responses:
 *       204:
 *         description: Staff member deleted successfully
 *       404:
 *         description: Staff member not found
 */
router.delete('/delete/:staffId', loginJWTAthentication, checkRole(['Admin', 'Super Admin']),chekPerm(['Staff','delete']), staffController.deleteStaff);
/**
 * @swagger
 * /staff/search:
 *   get:
 *     summary: Search for staff members by name, email, or role
 *     tags: [Staff]
 *     parameters:
 *       - in: query
 *         name: searchValue
 *         required: true
 *         description: The value to search for (first name, last name, email, or role)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of staff members matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staffId:
 *                     type: string
 *                     description: The staff ID.
 *                     example: d8e6dc7a-7e7f-4873-8b02-5fe540ea7a6a
 *                   firstName:
 *                     type: string
 *                     description: The staff's first name.
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     description: The staff's last name.
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     description: The staff's email.
 *                     example: johndoe@gmail.com
 *                   role:
 *                     type: string
 *                     description: The staff's role.
 *                     example: Doctor
 *                   shiftSchedule:
 *                     type: string
 *                     description: The staff's shift schedule.
 *                     example: Morning
 *                   employStatus:
 *                     type: string
 *                     description: The staff's employment status.
 *                     example: Active
 *                   phone:
 *                     type: string
 *                     description: The staff's phone number.
 *                     example: +123456789
 *                   educationalQualification:
 *                     type: string
 *                     description: The staff's educational qualification.
 *                     example: MBBS
 *                   yrOfExperience:
 *                     type: string
 *                     description: Years of experience of the staff member.
 *                     example: 5
 *                   licence:
 *                     type: number
 *                     description: License information of the staff member.
 *                     example: 2282923938
 *                   specialization:
 *                     type: string
 *                     description: The staff's specialization.
 *                     example: Pediatrics
 *                   location:
 *                     type: string
 *                     description: The staff's location.
 *                     example: New York
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: The staff's date of birth.
 *                     example: 1990-01-01
 *                   gender:
 *                     type: string
 *                     description: The staff's gender.
 *                     example: Male
 *                   departmentName:
 *                     type: string
 *                     description: The staff's department name.
 *                     example: Pediatrics
 *       400:
 *         description: Bad request - search value is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Search value is required
 *       404:
 *         description: No staff members found matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No staff members found matching the search criteria
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while processing the request
 */

router.get('/search', loginJWTAthentication, staffController.searchStaff);
/**
 * @swagger
 * /staff/signIn:
 *   post:
 *     summary: Sign in a staff member
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the staff member
 *               password:
 *                 type: string
 *                 description: Password of the staff member
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 id:
 *                   type: string
 *                   description: Staff ID of the signed-in member
 *                 username:
 *                   type: string
 *                   description: Username of the signed-in member
 *                 email:
 *                   type: string
 *                   description: Email of the signed-in member
 *                 role:
 *                   type: string
 *                   description: Role of the signed-in member
 *       400:
 *         description: Email is not registered
 *       404:
 *         description: Incorrect login details
 */
router.post('/signIn', staffController.signIn);

/**
 * @swagger
 * /staff/doctor/all:
 *   get:
 *     summary: Retrieve all doctors
 *     tags: [Staff]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of doctors to return per page (default is 10)
 *     security:
 *       - bearerAuth: []  # Assuming you are using JWT for authentication
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDoctors:
 *                   type: integer
 *                   description: Total number of doctors available
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 doctors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       staffId:
 *                         type: string
 *                         description: The staff ID of the doctor
 *                       firstName:
 *                         type: string
 *                         description: First name of the doctor
 *                       lastName:
 *                         type: string
 *                         description: Last name of the doctor
 *                       email:
 *                         type: string
 *                         description: Email of the doctor
 *                       role:
 *                         type: string
 *                         description: Role of the doctor
 *                       shiftSchedule:
 *                         type: string
 *                         description: Shift schedule of the doctor
 *                       employStatus:
 *                         type: string
 *                         description: Employment status of the doctor
 *                       phone:
 *                         type: string
 *                         description: Phone number of the doctor
 *                       educationalQualification:
 *                         type: string
 *                         description: Educational qualification of the doctor
 *                       yrOfExperience:
 *                         type: string
 *                         description: Years of experience of the doctor
 *                       licence:
 *                         type: number
 *                         description: License information of the doctor
 *                         example : 1112238392
 *                       specialization:
 *                         type: string
 *                         description: Specialization of the doctor
 *                       location:
 *                         type: string
 *                         description: Location of the doctor
 *                       dateOfBirth:
 *                         type: string
 *                         format: date
 *                         description: Date of birth of the doctor
 *                         example : yyyy-dd-mm
 *                       gender:
 *                         type: string
 *                         description: Gender of the doctor
 *                       departmentName:
 *                         type: string
 *                         description: Name of the department the doctor belongs to
 *       500:
 *         description: Internal server error
 */
router.get('/doctor/all', loginJWTAthentication, checkRole(['Admin', 'Super Admin']), staffController.allDoctors);

/**
 * @swagger
 * /staff/nurses/all:
 *   get:
 *     summary: Retrieve all nurses
 *     tags: [Staff]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of nurses to return per page (default is 10)
 *     security:
 *       - bearerAuth: []  # Assuming you are using JWT for authentication
 *     responses:
 *       200:
 *         description: A list of nurses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalNurses:
 *                   type: integer
 *                   description: Total number of nurses available
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 nurse:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       staffId:
 *                         type: string
 *                         description: The staff ID of the nurse
 *                       firstName:
 *                         type: string
 *                         description: First name of the nurse
 *                       lastName:
 *                         type: string
 *                         description: Last name of the nurse
 *                       email:
 *                         type: string
 *                         description: Email of the nurse
 *                       role:
 *                         type: string
 *                         description: Role of the nurse
 *                       shiftSchedule:
 *                         type: string
 *                         description: Shift schedule of the nurse
 *                       employStatus:
 *                         type: string
 *                         description: Employment status of the nurse
 *                       phone:
 *                         type: string
 *                         description: Phone number of the nurse
 *                       educationalQualification:
 *                         type: string
 *                         description: Educational qualification of the nurse
 *                       yrOfExperience:
 *                         type: string
 *                         description: Years of experience of the nurse
 *                       licence:
 *                         type: number
 *                         description: License information of the nurse
 *                         example: 2282923938
 *                       specialization:
 *                         type: string
 *                         description: Specialization of the nurse
 *                       location:
 *                         type: string
 *                         description: Location of the nurse
 *                       dateOfBirth:
 *                         type: string
 *                         format: date
 *                         description: Date of birth of the nurse
 *                         example : yyyy-dd-mm
 *                       gender:
 *                         type: string
 *                         description: Gender of the nurse
 *                       departmentName:
 *                         type: string
 *                         description: Name of the department the nurse belongs to
 *       500:
 *         description: Internal server error
 */
router.get('/nurses/all', loginJWTAthentication, checkRole(['Admin', 'Super Admin']), staffController.allNurses);

/**
 * @swagger
 * /staff/invite:
 *   post:
 *     summary: Invite a staff member
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the staff member being invited
 *               password:
 *                 type: string
 *                 description: Password for the staff member's account
 *               username:
 *                 type: string
 *                 description: Username of the staff member
 *             required:
 *               - email
 *               - password
 *               - username
 *     security:
 *       - bearerAuth: []  # Assuming you are using JWT for authentication
 *     responses:
 *       200:
 *         description: Staff invited successfully, mail sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the invitation was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the invited staff member
 *                     email:
 *                       type: string
 *                       description: Email of the invited staff member
 *                     status:
 *                       type: string
 *                       description: Current status of the invited staff member
 *                     role:
 *                       type: string
 *                       description: Role of the invited staff member
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if there was an error
 *                 message:
 *                   type: string
 *                   description: Error message
 *                 error:
 *                   type: string
 *                   description: Detailed error message
 */
router.post('/invite', loginJWTAthentication, checkRole(['Admin', 'Super Admin']), staffController.inviteStaff);

/**
 * @swagger
 * /staff/update/{staffId}:
 *   put:
 *     summary: Update staff member details
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         description: ID of the staff member to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: New username of the staff member
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email of the staff member
 *               departmentName:
 *                 type: string
 *                 description: New department name of the staff member
 *               role:
 *                 type: string
 *                 description: New role of the staff member
 *               staffStatus:
 *                 type: string
 *                 description: New employment status of the staff member
 *             required:
 *               - userName
 *               - email
 *               - departmentName
 *               - role
 *               - staffStatus
 *     security:
 *       - bearerAuth: []  # Assuming you are using JWT for authentication
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 staffId:
 *                   type: string
 *                   description: ID of the updated staff member
 *                 userName:
 *                   type: string
 *                   description: Updated username
 *                 email:
 *                   type: string
 *                   description: Updated email
 *                 departmentName:
 *                   type: string
 *                   description: Updated department name
 *                 role:
 *                   type: string
 *                   description: Updated role
 *                 staffStatus:
 *                   type: string
 *                   description: Updated employment status
 *       400:
 *         description: Bad request, possibly due to existing email or invalid department name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Staff not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating staff not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detailed error message
 */
router.put('/update/:staffId', loginJWTAthentication, checkRole(['Admin', 'Super Admin']),chekPerm(['Staff','edit','create']), staffController.updateStaff);
/**
 * @swagger
 * /update-permissions/{staffId}:
 *   put:
 *     summary: Update staff permissions
 *     description: Updates the permissions of a staff member.
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: staffId
 *         in: path
 *         required: true
 *         description: ID of the staff member whose permissions will be updated.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Permission'
 *             required:
 *               - permissions
 *     responses:
 *       200:
 *         description: Permissions updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Permissions updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Invalid permissions format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid permissions format"
 *       403:
 *         description: Access denied. No permissions found or missing required permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied. No permissions found."
 *       404:
 *         description: Staff not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Staff not found"
 *       500:
 *         description: An error occurred while updating permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating permissions"
 */
router.put('/update-permissions/:staffId', loginJWTAthentication, checkRole(['Admin', 'Super Admin']),chekPerm(['Staff','edit','create']), staffController.updatePermissions);

module.exports = router;
