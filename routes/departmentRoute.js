// const express = require("express");
// const department = require("../controllers/departmentController");
// const router = express.Router();


// router.post("/create", department.departmentClass.createDept);
// router.get("/list", department.departmentClass.getDepts);
// router.get("/list/:id", department.departmentClass.getDepts);
// router.put("/update/:id", department.departmentClass.updateDept);
// router.delete("/delete/:id", department.departmentClass.deleteDept);

// module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management API
 */

const express = require("express");
const department = require("../controllers/departmentController");
const router = express.Router();

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
 *                 example: Cardiology
 *               description:
 *                 type: string
 *                 example: Department for heart-related conditions
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
 *         description: The department ID
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
 *         description: The department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Neurology
 *               description:
 *                 type: string
 *                 example: Department for neurological disorders
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
 *         description: The department ID
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", department.departmentClass.deleteDept);

module.exports = router;
