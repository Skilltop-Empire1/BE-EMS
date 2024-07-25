// require needed modules
const Joi = require("joi");
const Patient = require("../models/PatientModel");
const {
  patientValidity,
  patientUpdate,
  deletePatientValidity,
} = require("../validations/patientFormValidation");

class PatientClass {
  //test rout
  login = (req, res) => {
    try {
      return res.send("welcome to our app");
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
        where: { email: req.body.email },
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
        where: { email: req.body.email },
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
                email: req.body.email,
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
    const email = req.body.email;

    const check = deletePatientValidity.validate(req.body);
    if (check.error) {
      return res.status(404).send(check.error.details[0].message);
    }

    // delete patient data
    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { email: req.body.email },
      });

      if (patientExist) {
        await Patient.destroy({
          where: {
            email: req.body.email,
          },
        });
        return res.status(200).send("Patient data deleted successfully");
      } else {
        return res.status(404).send("Patient does not exsist");
      }
    } catch (error) {
      throw error;
    }
  };
} //class close

// creat instance of the patient class
const patientClass = new PatientClass();

//export class
module.exports = {
  patientClass,
};
