const express = require("express");
const department = require("../controllers/departmentController");
const router = express.Router();

// Create a new organization
router.post("/create", department.departmentClass.createDept);

// Get all organizations
router.get("/list", department.departmentClass.getDepts);

// Update an organization by ID
router.put("/update/:id", department.departmentClass.updateDept);

// Delete an organization by ID
router.delete("/delete/:id", department.departmentClass.deleteDept);

module.exports = router;
