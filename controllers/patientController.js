const Joi = require("joi");
const {
  patientUpdateSchema,
  patientCreateSchema,
  patientDeleteSchema,
} = require("../validations/patientFormValidation");
const bcrypt = require('bcryptjs');

// requiring multer library
const upload = require("../middlewares/multer");
const { Patient,Staff, Department, Appointment, Account } = require("../models");
const {Op, OpTypes, where} = require("sequelize");

// Object for functionality

class PatientClass {
  //route too display all patient
  patientdisplay = async (req, res) => {
    const page = 1
    const pageSize = 10
    const limit = pageSize
    const offset = (page-1)*pageSize

    try {
      const patientdisplay = await Patient.findAll({
        include: [{
          model: Department,
          as: 'department',
          required: false
        }],

        include: [{
          model: Staff,
          as: 'staff',
          required: false
        }],

       
        include: [{
          model: Appointment,
          as: 'appointments',
          required: false
        }],

        include: [{
          model: Account,
          as: 'account',
          required: false
        }],

       
        // pagination
        limit:limit,
        offset:offset,
        order: [['firstName', 'ASC']],
      
        
      });
      return res.status(200).json(patientdisplay)
    } catch (error) {
      return console.log(error);
    }
  };

  patientCount = async (req, res) => {
    try {
      const patientCount = await Patient.findAndCountAll({});
      return res.json([patientCount.count]);
    } catch (error) {
      return console.log(error);
    }
  };

  // Method to create patient's details
  createPatient = async (req, res) => {
    try {
      // Destructure the request body
      const {
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        lastVisit,
        medCondition,
      } = req.body;

      // Validate input using Joi schema
      const { error } = patientCreateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Check if patient already exists by phone number
      const patientExist = await Patient.findOne({
        where: { phone },
      });

      if (patientExist) {
        return res.status(409).json({ message: "Patient already exists with this phone number" });
      }

      // Create new patient if they don't exist
      const newPatient = await Patient.create({
        firstName,
        lastName,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        lastVisit,
        medCondition,
      });

      // Respond with the newly created patient data
      return res.status(201).json(newPatient);
    } catch (error) {
      // Handle server errors
      console.error("Error creating patient:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //Method for edit patient details
  patientEdit = async (req, res) => {
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      lastVisit,
      medCondition,
    } = req.body;

    //validate inputs
    const check = patientUpdateSchema.validate(req.body);
    if (check.error) {
      return res.status(404).json(check.error.details[0].message);
    }

    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { patId: req.body.id },
      });

      //update logic
      if (patientExist) {
        let patientUpdate;
        patientUpdate = await Patient.update(
          {
            firstName,
            lastName,
            email,
            phone,
            gender,
            dateOfBirth,
            address,
            lastVisit,
            medCondition,
          },
          {
            where: {
              patId: req.body.id,
            },
          }
        );
        return res.status(201).json({
          msg: "Patient data updated successfully",
          patientUpdate,
        });
      } else {
        return res.status(404).json({
          msg: "Patient record not found for update",
        });
      }
    } catch (error) {
      throw error;
    }
  }; //patientEdit close

  //method to delete patient
  deletePatient = async (req, res) => {
    const patId = req.params;

    // const check = patientDeleteSchema.validate(req.body);
    // if (check.error) {
    //   return res.status(404).json(check.error.details[0].message);
    // }

    // delete patient data
    try {
      // check if patient exist
      const patientExist = await Patient.findOne({
        where: { patId:req.params.patId },
      });

      if (patientExist) {
        await Patient.destroy({
          where: {
            patId:req.params.patId,
          },
        });
        return res.status(201).json({ msg: "Patient deleted successfully" });
      } else {
        return res.status(404).json({ msg: "Patient's record not found" });
      }
    } catch (error) {
      throw error;
    }
  };


  // search method
  searchPartient = async (req,res) =>{
    const {searchParameter} = req.body

    if(!searchParameter){
      return res.json({msg: "Enter a search parameter"})
    }

    const searching = await Patient.findAll({
      where:{
        [Op.or]: [
          {
           firstName: {[Op.iLike]: searchParameter.length > 10 ?  searchParameter: `%${searchParameter}%`},
      },

      {
        lastName: {[Op.iLike]: searchParameter.length > 10 ?  searchParameter: `%${searchParameter}%`},
   },
    ]
    },
    order: [['firstName', 'ASC'], ['lastName', 'ASC']],
    })

    if(searching < 1){
      return res.status(404).json({msg: "No patient with the search details found"})
    }
    return res.status(200).json(searching)
  } //search method end

  










//    //change staff password
//    changePassword = async (req, res) => {
//     const { 
//       oldPassword, 
//       password, 
//       confirmPassword } = req.body;
    
//     //validate details
//     const check = updatePasswordSchema.validate(req.body);
//     if (check.error) {
//       return res.status(404).json(check.error.details[0].message);
//     }

//     //queery to check if user exist */
//     const staffEmail = req.user.email
//     const staff = await Staff.findOne({ where: { email:staffEmail } });
//     const isMatch = await bcrypt.compare(oldPassword, staff.password);
//     if (!isMatch) {return res.status(404).json({ msg: "Incorrect password" });}
//     if (!staff) {
//       return res.status(400).send("Staff with the email does not exist");
//     } 
//     if (password !== confirmPassword) {
//       return res.json({ msg: "New password must match the confirmation" });
//     }

// //update code
//     const hash = await bcrypt.hash(password, 10);
//     try {
//       const staffPasswordUpdate = await Staff.update(
//         { password: hash },
//         { where: { email: staffEmail } }
//       );

//       if(staffPasswordUpdate){
//         console.log(`New Hashed Password: ${staff.password}`)
//         return res
//           .status(201)
//           .json({ msg: "Staff password updated successfully" });
//       }else{
//         return res
//           .status(404)
//           .json({ msg: "Password update failed" });
//       }
      
//     } catch (error) {
//       return error
//     }
//   };//end of method


  




  //functionality to upload image
  // profilePics = async (req, res) => {
  //   try {
  //     //
  //     const mobile_no = req.body.mobile_no

  //     //validate field
  //     const check = deletePatientValidity.validate(req.body);
  //     if (check.error) {
  //       return res.status(404).send(check.error.details[0].message);
  //   }

  //   //check if patiebt exist
  //     const patientExist = Patient.findOne({
  //       where: { mobile_no: req.body.mobile_no },
  //     })

  //     const filePath = req.file.path
  //     if(patientExist){
  //       await Patient.update({
  //         picture: filePath
  //       },
  //       {
  //         where: { mobile_no: req.body.mobile_no },
  //       }
  //     )
  //     console.log(req.file)
  //     return res.status(200).json({message: 'File upload successful'})
  //     }else{
  //       res.status(404).json({message: 'Patient does not exist'})
  //     }
  //   } catch (error) {
  //     throw error
  //   }

  // }

  // // Display profile image
  // displayPics = async (req, res) => {
  //   try {
  //     const mobile_no = req.body.mobile_no
  //     const check = deletePatientValidity.validate(req.body);
  //     if (check.error) {
  //       return res.status(404).send(check.error.details[0].message);
  //   }
  //   //find patient
  //   const patientExist = Patient.findOne({

  //     where: { mobile_no: req.body.mobile_no },
  //   })
  //   if(patientExist){

  //   res.send(resolve(patientExist.picture))
  //   console.log("file found")

  //   }

  //   } catch (error) {

  //   }

  // }
} //class close

// creat instance of the patient class
const patientClass = new PatientClass();

//export class
module.exports = {
  patientClass,
};

// Image.findByPk(req.params.id);
//     if (!image) {
//       return res.status(404).send('Image not found');
//     }
//     res.sendFile(path.join(__dirname, '../uploads/', image.filename)); // Adjust the path as necessary
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve image' });
//   }
