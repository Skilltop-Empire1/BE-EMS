 const Joi = require("joi");


const departmentSchema = Joi.object({
  name: Joi.string().max(250).required(),               
  hod: Joi.string().max(100).allow(null, ''),           
  deptContact: Joi.string().max(20).allow(null, ''),    
  operationHr: Joi.string().allow(null, ''),            
  noOfStaff: Joi.number().integer().allow(null),        
  location: Joi.string().max(250).allow(null, ''),      
  bedCapacity: Joi.string().max(50).allow(null, ''),    
  specialty: Joi.string().max(50).required(),           
  noOfPatient: Joi.number().integer().allow(null),      
  equipment: Joi.array().items(Joi.string()).allow(null), 
  deptBudget: Joi.number().precision(2).allow(null),    
});

module.exports = {
  departmentSchema,
};
