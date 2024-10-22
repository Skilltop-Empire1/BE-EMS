const express = require("express");
const department = require("../controllers/departmentController");
const router = express.Router();


router.post("/create", department.departmentClass.createDept);
router.get("/list", department.departmentClass.getDepts);
router.get("/list/:id", department.departmentClass.getDepts);
router.put("/update/:id", department.departmentClass.updateDept);
router.delete("/delete/:id", department.departmentClass.deleteDept);

module.exports = router;
