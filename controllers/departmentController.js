const { Department } = require("../models");
const {
  departmentSchema,
} = require("../validations/departmentFormValidation");

class DepartmentClass {
  // Create a new organization
  createDept = async (req, res) => {
    try {
      const { error } = departmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const newDept = await Department.create(req.body);
      return res.status(201).json(newDept);
    } catch (err) {
      console.error("Error creating department:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Get all organizations
  getDepts = async (req, res) => {
    try {
      const depts = await Department.findAll();
      return res.status(200).json(depts);
    } catch (err) {
      console.error("Error fetching separtments:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Update an organization by ID
  updateDept = async (req, res) => {
    try {
      const { id } = req.params;
      const { error } = departmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const [updated] = await Department.update(req.body, {
        where: { id },
      });

      if (updated) {
        const updatedDept = await Department.findByPk(id);
        return res.status(200).json(updatedDept);
      }

      return res.status(404).json({ message: "Department not found" });
    } catch (err) {
      console.error("Error updating department:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Delete an organization by ID
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

