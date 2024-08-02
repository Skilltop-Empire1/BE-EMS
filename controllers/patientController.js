// require needed modules
const Joi = require("joi");
const Patient = require("../models/PatientModel");
const {
  patientValidity,
  patientUpdate,
  deletePatientValidity,
} = require("../validations/patientFormValidation");
// requiring multer library






// Object for functionality

class PatientClass {
  //route to count number of patients

  patientCount = async (req, res) => {
    try {
      const patientCount = await Patient.findAndCountAll({});
      return res.send([patientCount.count]);
    } catch (error) {
      return console.log(error);
    }
  };

  // method to create patient's details
  createPatient = async (req, res) => {
    const {
      id,
      firstname,
      surname,
      email,
      mobile_no,
      gender,
      dob,
      address,
      education_qualification,
      organization,
    } = req.body;

    //validate inputs
    const check = patientValidity.validate(req.body);
    if (check.error) {
      return res.status(404).send(check.error.details[0].message);
    }
    try {
      //check if patient exist
      const patientExist = await Patient.findOne({
        where: { mobile_no: req.body.mobile_no },
      });

      // create patient data if patient does not exist
      if (!patientExist) {
        return res.status(200).send(
          Patient.create({
            id,
            firstname,
            surname,
            email,
            mobile_no,
            gender,
            dob,
            address,
            education_qualification,
            organization,
          })
        );
      } else {
        return res.status(404).send("Patient already exist");
      }
    } catch (error) {
      throw error;
    }
  }; //createpatient method close

  //Method for edit patient details
  patientEdit = async (req, res) => {
    const {
      firstname,
      surname,
      email,
      mobile_no,
      gender,
      dob,
      address,
      education_qualification,
      organization,
    } = req.body;

    //validate inputs
    const check = patientUpdate.validate(req.body);
    if (check.error) {
      return res.status(404).send(check.error.details[0].message);
    }

    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { mobile_no: req.body.mobile_no },
      });

      //update logic
      if (patientExist) {
        return res.status(200).send(
          Patient.update(
            {
              firstname,
              surname,
              email,
              mobile_no,
              gender,
              dob,
              address,
              education_qualification,
              organization,
            },
            {
              where: {
                mobile_no: req.body.mobile_no,
              },
            }
          )
        );
      } else {
        return res.status(404).send("Patient details not found for update");
      }
    } catch (error) {
      throw error;
    }
  }; //patientEdit close

  //method to delete patient
  deletePatient = async (req, res) => {
    const mobile_no = req.body.mobile_no;

    const check = deletePatientValidity.validate(req.body);
    if (check.error) {
      return res.status(404).send(check.error.details[0].message);
    }

    // delete patient data
    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { mobile_no: req.body.mobile_no },
      });

      if (patientExist) {
        await Patient.destroy({
          where: {
            mobile_no: req.body.mobile_no,
          },
        });
        return res.status(200).send("Patient data deleted successfully");
      } else {
        return res.status(404).send("Patient does not exist");
      }
    } catch (error) {
      throw error;
    }
  };

  //functionality to upload image

  profilePics = async (req, res) => {
    return res.send(req.file)  
  };
  
} //class close

// creat instance of the patient class
const patientClass = new PatientClass();

//export class
module.exports = {
  patientClass,
};
