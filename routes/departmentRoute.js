const express = require("express");
const department = require("../controllers/departmentController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management API
 */

/**
 * @swagger
/**
 * @swagger
 * /departments/create:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bllode
 *                 description: The name of the department
 *               hod:
 *                 type: string
 *                 example: Musa
 *                 description: Head of department
 *               deptContact:
 *                 type: string
 *                 example: 07066798812
 *                 description: Contact number for the department
 *               operationHr:
 *                 type: string
 *                 example: 8.00AM - 4.00PM
 *                 description: Operating hours of the department
 *               noOfStaff:
 *                 type: integer
 *                 example: 24
 *                 description: Number of staff in the department
 *               location:
 *                 type: string
 *                 example: Akure
 *                 description: Location of the department
 *               bedCapacity:
 *                 type: integer
 *                 example: 50
 *                 description: Total bed capacity available
 *               specialty:
 *                 type: string
 *                 example: Pediatrics
 *                 description: Specialty area of the department
 *               noOfPatient:
 *                 type: integer
 *                 example: 100
 *                 description: Number of patients served
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["MRI Machine", "Scanner", "Pedri"]
 *                 description: List of equipment available in the department
 *               deptBudget:
 *                 type: integer
 *                 example: 1000000
 *                 description: Department's budget in the local currency
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/create", department.departmentClass.createDept);

/**
 * @swagger
 * /departments/list:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: Successfully retrieved department list
 *       500:
 *         description: Server error
 */
router.get("/list", department.departmentClass.getDepts);

/**
 * @swagger
 * /departments/list/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the department
 *     responses:
 *       200:
 *         description: Successfully retrieved department
 *       404:
 *         description: Department not found
 *       500:
 *         description: Server error
 */
router.get("/list/:id", department.departmentClass.getDepts);

/**
 * @swagger
 * /departments/update/{id}:
 *   put:
 *     summary: Update a department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deptName:
 *                 type: string
 *                 example: Neurology
 *                 description: Name of the department
 *               description:
 *                 type: string
 *                 example: Department for neurological disorders
 *                 description: Brief description of the department
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Server error
 */
router.put("/update/:id", department.departmentClass.updateDept);

/**
 * @swagger
 * /departments/delete/{id}:
 *   delete:
 *     summary: Delete a department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the department
 *     responses:
 *       204:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", department.departmentClass.deleteDept);


module.exports = router;

