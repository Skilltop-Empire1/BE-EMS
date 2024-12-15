const { Department } = require("../models");
const {
  departmentSchema,
} = require("../validations/departmentFormValidation");

class DepartmentClass {
  // Create a new department
  createDept = async (req, res) => {
    try {
      const {
        name,
        hod,
        deptContact,
        operationHr,
        noOfStaff,
        location,
        bedCapacity,
        specialty,
        noOfPatient,
        equipment,
        deptBudget
      } = req.body
      const { error } = departmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const deptExist = await Department.findOne({where:{name}})
      if(deptExist) return res.status(404).json({msg:"Department already exist"})
      const newDept = await Department.create({
        name,
        hod,
        deptContact,
        operationHr,
        noOfStaff,
        location,
        bedCapacity,
        specialty,
        noOfPatient,
        equipment,
        deptBudget
      });
      return res.status(201).json(newDept);
    } catch (err) {
      console.error("Error creating department:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  //get a single department
  getDepts = async (req, res) => {
    try {
      const depts = await Department.findAll();
      return res.status(200).json(depts);
    } catch (err) {
      console.error("Error fetching separtments:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  // Get all organizations
  getADepts = async (req, res) => {
    try {
      const {id} = req.params
      const dept = await Department.findByPk(id);
      return res.status(200).json(dept);
    } catch (err) {
      console.error("Error fetching separtments:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Update an department by ID
  updateDept = async (req, res) => {
    try {
      const { id } = req.params;
      const {name,
    hod,
    deptContact,
    operationHr,
    noOfStaff,
    location,
    bedCapacity,
    specialty,
    noOfPatient,
    equipment,
    deptBudget
} = req.body

      const dept = await Department.findByPk(id);
      if(!dept) {
        return res.status(404).json({error:"department not found"});
      }

       await dept.update({
        name:name || dept.name,
        hod:hod || dept.hod,
        deptContact:deptContact || dept.deptContact,
        operationHr:operationHr || dept.operationHr,
        noOfStaff:noOfStaff || dept.noOfStaff,
        location:location || dept.location,
        bedCapacity:bedCapacity || dept.bedCapacity,
        specialty:specialty || specialty,
        noOfPatient:noOfPatient || dept.noOfPatient,
        equipment:equipment || dept.equipment,
        deptBudget:deptBudget || dept.deptBudget
      });
      return res.status(200).json(dept);
    } catch (err) {
      console.error("Error updating department:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Delete an department by ID
  deleteDept = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Department.destroy({
        where: { id },
      });

      if (deleted) {
        return res.status(204).json();
      }

      return res.status(404).json({ message: "Department not found" });
    } catch (err) {
      console.error("Error deleting department:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

const departmentClass = new DepartmentClass();


module.exports = {
  departmentClass,
};

