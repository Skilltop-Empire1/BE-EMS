const Joi = require("joi");

// Validation schema for creating/updating an organization
const departmentSchema = Joi.object({
  name: Joi.string().max(250).required(),
      hod: Joi.string().max(100).allow(null),
      deptContact: Joi.number().required(),
      operationHr: Joi.date().required(),
      noOfStaff: Joi.number().required(),
      location: Joi.string().max(250).required(),
      bedCapacity: Joi.string().max(50).required(),
      specialty: Joi.string().max(50).required(),
      noOfPatient: Joi.number().required(),
      equipment: Joi.string().max(20).required(),
      deptBudget: Joi.number().required(),
});

module.exports = {
  departmentSchema,
};
