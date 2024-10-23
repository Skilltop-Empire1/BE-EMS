const { Staff,Department } = require("../models"); 
const { staffSchema } = require("../validations/staffFormValidation"); 
const { validatePhoneNumber } = require('../validations/numberValidator');
const { Op } = require("sequelize"); 


let mailTransporter = nodemailer.createTransport({
  host: "mail.skilltopims.com",  
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const getDepartmentIdByName = async (departmentName) => {
  const department = await Department.findOne({
    where: { name: departmentName }, 
  });
  return department ? department.deptId : null;
};

const getDepartmentNameById = async (deptId) => {
  const department = await Department.findOne({
    where: { deptId }, 
    attributes: ['name'], // Fetch only the name field
  });
  return department ? department.name : null;
};


exports.createStaff = async (req, res) => {
  try {
    // Validate the request body
    const { error } = staffSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
  const {firstName, lastName, role, departmentName, specialization, shiftSchedule, employStatus, location, dateOfHire, yrOfExperience, email, phone,dateOfBirth,gender,licence,educationalQualification} = req.body;
  const deptId = await getDepartmentIdByName(departmentName);
  if (!deptId) {
    return res.status(400).json({ error: "Invalid department name" });
  }
  if (!validatePhoneNumber(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  if (await Staff.findOne({ where: { email} })) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  if (await Staff.findOne({ where: { phone} })) {
  return res.status(400).json({ error: 'Phone number already exists' });
 }
  // Create the staff in the database
  const staff = await Staff.create({
    firstName, 
    lastName, 
    role, 
    deptId, 
    specialization, 
    shiftSchedule, 
    employStatus, 
    location, 
    dateOfHire, 
    yrOfExperience, 
    email, 
    phone,
    dateOfBirth,
    gender,
    licence,
    educationalQualification
});
    // Get the department name for the response
    const departmentNameResponse = await getDepartmentNameById(staff.deptId);

    // response object
    const response = {
      staffId: staff.staffId,
      staffStatus: staff.staffStatus,
      firstName: staff.firstName,
      lastName: staff.lastName,
      role: staff.role,
      departmentName: departmentNameResponse, 
      specialization: staff.specialization,
      shiftSchedule: staff.shiftSchedule,
      employStatus: staff.employStatus,
      location: staff.location,
      dateOfHire: staff.dateOfHire,
      yrOfExperience: staff.yrOfExperience,
      email: staff.email,
      phone: staff.phone,
      dateOfBirth: staff.dateOfBirth,
      gender: staff.gender,
      licence: staff.licence,
      educationalQualification: staff.educationalQualification,
      profileUrl: staff.profileUrl,
      password: staff.password,
      vacationDays: staff.vacationDays,
      permission: staff.permission
    };
res.status(201).json(response);
} catch (error) {
  res.status(404).json({ error: error.message });
}
}


exports.viewStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const staff = await Staff.findOne({
      where: { staffId },
      include: [{
        model: Department,
        as: 'department',
        attributes: ['name'] 
      }]
    });

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    // Prepare the response to include only the necessary attributes
    const response = {
      staffId: staff.staffId,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      shiftSchedule: staff.shiftSchedule,
      dateOfHire: staff.dateOfHire,
      gender: staff.gender,
      employStatus: staff.employStatus,
      staffStatus: staff.staffStatus,
      phone: staff.phone,
      educationalQualification: staff.educationalQualification,
      yrOfExperience: staff.yrOfExperience,
      licence: staff.licence,
      specialization: staff.specialization,
      location: staff.location,
      dateOfBirth: staff.dateOfBirth,
      role: staff.role,
      departmentName: staff.department ? staff.department.name : null // Add only the department name
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.editStaff = async (req, res) => {
  try {
    // Get the staff ID from the request params
    const staffId = req.params.staffId;

    // Find the staff by ID first
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    // Extract only the fields that are provided in the request body
    const { 
      firstName, lastName, role, departmentName, specialization, shiftSchedule, employStatus, 
      location, dateOfHire, yrOfExperience, email, phone, dateOfBirth, gender, 
      licence, educationalQualification 
    } = req.body;

    // If email is provided and different from current, check for duplicates
    if (email && email !== staff.email) {
      const emailExists = await Staff.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // If phone is provided and different from current, check for duplicates
    if (phone && phone !== staff.phone) {
      if (!validatePhoneNumber(phone)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
      }
      const phoneExists = await Staff.findOne({ where: { phone } });
      if (phoneExists) {
        return res.status(400).json({ error: 'Phone number already exists' });
      }
    }
     // Get the departmentId by departmentName
     let deptId;
     if (departmentName) {
       deptId = await getDepartmentIdByName(departmentName);
       if (!deptId) {
         return res.status(400).json({ error: "Invalid department name" });
       }
     }

    // Update only the fields that are provided (undefined fields will be ignored)
    await staff.update({
      firstName: firstName || staff.firstName,
      lastName: lastName || staff.lastName,
      role: role || staff.role,
      deptId: deptId || staff.deptId,
      specialization: specialization || staff.specialization,
      shiftSchedule: shiftSchedule || staff.shiftSchedule,
      employStatus: employStatus || staff.employStatus,
      location: location || staff.location,
      dateOfHire: dateOfHire || staff.dateOfHire,
      yrOfExperience: yrOfExperience || staff.yrOfExperience,
      email: email || staff.email,
      phone: phone || staff.phone,
      dateOfBirth: dateOfBirth || staff.dateOfBirth,
      gender: gender || staff.gender,
      licence: licence || staff.licence,
      educationalQualification: educationalQualification || staff.educationalQualification
    });

    // Return the updated staff data, with departmentName included
    const response = {
      staffId: staff.staffId,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      shiftSchedule: staff.shiftSchedule,
      dateOfHire: staff.dateOfHire,
      gender: staff.gender,
      employStatus: staff.employStatus,
      phone: staff.phone,
      educationalQualification: staff.educationalQualification,
      yrOfExperience: staff.yrOfExperience,
      licence: staff.licence,
      specialization: staff.specialization,
      location: staff.location,
      dateOfBirth: staff.dateOfBirth,
      role: staff.role,
      departmentName: departmentName || (staff.department ? staff.department.name : null) // Set departmentName from request or keep existing
    };

    // Return the updated staff data
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteStaff = async (req, res) => {
  try {
    // Get the staff ID from the request params
    const staffId = req.params.staffId;

    // Check if the staff member exists
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    // Delete the staff member from the database
    await staff.destroy();
    res.status(200).json({ message: "Staff deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 

exports.searchStaff = async (req, res) => {
  try {
    // Extract the search value from the query parameters
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: "Search value is required" });
    }

    // Enum values for role
    const validRoles = ['Doctor', 'Nurse', 'Admin']; 

    //search criteria to match fields
    const searchCriteria = {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${searchValue}%` } }, 
        { lastName: { [Op.iLike]: `%${searchValue}%` } },  
        { email: { [Op.iLike]: `%${searchValue}%` } },    
      ]
    };

    // Check if the searchValue is a valid role
    if (validRoles.includes(searchValue)) {
      searchCriteria[Op.or].push({ role: searchValue }); 
    }

   // Fetch staff members including their department information
const staff = await Staff.findAll({
  where: searchCriteria,
  include: [
    {
      model: Department,
      as: 'department',
      attributes: ['name'], 
    }
  ]
});
    // If no staff members are found
    if (staff.length === 0) {
      return res.status(404).json({ message: "No staff members found matching the search criteria" });
    }

// Format the response to include departmentName instead of deptId
const formattedStaff = staff.map(staffMember => {
  return {
    staffId: staffMember.staffId,
    firstName: staffMember.firstName,
    lastName: staffMember.lastName,
    email: staffMember.email,
    role: staffMember.role,
    shiftSchedule: staffMember.shiftSchedule,
    employStatus: staffMember.employStatus,
    phone: staffMember.phone,
    educationalQualification: staffMember.educationalQualification,
    yrOfExperience: staffMember.yrOfExperience,
    licence: staffMember.licence,
    specialization: staffMember.specialization,
    location: staffMember.location,
    dateOfBirth: staffMember.dateOfBirth,
    gender: staffMember.gender,
    departmentName: staffMember.department ? staffMember.department.name : null // Access department name
  };
});
    // Return the search results
    res.status(200).json(formattedStaff);

  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};


exports.allDoctors = async (req, res) => {
  try {
    // Get pagination parameters from query string, with default values
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; // Default to 10 per page
    const offset = (page - 1) * limit; // Calculate offset 

    // Fetch doctors from the staff table where role is 'Doctor'
    const { count, rows } = await Staff.findAndCountAll({
      where: { role: 'Doctor' },
      limit: limit,
      offset: offset,
      include: [
        {
          model: Department, // Assuming you have a Department model associated with Staff
          as: 'department',   // Use the alias defined in the Staff model
          attributes: ['name'] // Include only the department name
        }
      ]
    });

    // Format the response to include department name instead of deptId
    const formattedDoctors = rows.map(doctor => {
      return {
        staffId: doctor.staffId,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        role: doctor.role,
        shiftSchedule: doctor.shiftSchedule,
        employStatus: doctor.employStatus,
        phone: doctor.phone,
        educationalQualification: doctor.educationalQualification,
        yrOfExperience: doctor.yrOfExperience,
        licence: doctor.licence,
        specialization: doctor.specialization,
        location: doctor.location,
        dateOfBirth: doctor.dateOfBirth,
        gender: doctor.gender,
        departmentName: doctor.department ? doctor.department.name : null // Access department name
      };
    });

    // Return paginated data
    res.status(200).json({
      totalDoctors: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      doctors: formattedDoctors // Use formattedDoctors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.allNurses = async (req, res) => {
  try {
    // Get pagination parameters from query string, with default values
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; // Default to 10 per page
    const offset = (page - 1) * limit; // Calculate offset 

    // Fetch doctors from the staff table where role is 'Doctor'
    const { count, rows } = await Staff.findAndCountAll({
      where: { role: 'Nurse' },
      limit: limit,
      offset: offset,
      include: [
        {
          model: Department, 
          as: 'department',   
          attributes: ['name'] 
        }
      ]
    });

    // Format the response to include department name instead of deptId
    const formattedNurses = rows.map(nurse => {
      return {
        staffId: nurse.staffId,
        firstName: nurse.firstName,
        lastName: nurse.lastName,
        email: nurse.email,
        role: nurse.role,
        shiftSchedule: nurse.shiftSchedule,
        employStatus: nurse.employStatus,
        phone: nurse.phone,
        educationalQualification: nurse.educationalQualification,
        yrOfExperience: nurse.yrOfExperience,
        licence: nurse.licence,
        specialization: nurse.specialization,
        location: nurse.location,
        dateOfBirth: nurse.dateOfBirth,
        gender: nurse.gender,
        departmentName: nurse.department ? nurse.department.name : null 
      };
    });

    // Return paginated data
    res.status(200).json({
      totalNurses: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      nurse: formattedNurses 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.inviteStaff = async (req, res) => {
try {
const user = req.user;


const { email, password, username } = req.body;
if (!email || !password, !username) {
  return res.status(400).json({ message: 'Invalid credentials' });
}

// Check if the email already exists in staff
const existingStaff = await Staff.findOne({ where: { email: email } });
if (existingStaff) {
  return res.status(400).json({ message: 'Email already exists as a staff' });
}

const userExistingStaff = await User.findOne({ where: { email: email } });
if (userExistingStaff) {
  return res.status(400).json({ message: 'Email already exists as a user' });
}


// Hash the password before saving it
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const admin = req.user.username


const url = process.env.CLIENT_URL ;
const newStaff = await Staff.create({
  userId:user.userId,
  username,
  email,
  password: hashedPassword,  // Save the hashed password
  addedDate: new Date(),
  status: 'active',
  role: 'Employee',
  storeName: 'Store 1',
});
let mailOption = {
  from: process.env.EMAIL_USER,
  to: newStaff.email,
  subject: "You have been invited as a Staff Member",
  html: `<h2>Hi ${newStaff.username},</h2>
  <p>You have been invited by ${admin} to join as a staff member.</p>
  <p>Please use the credentials below to log in by clicking on this <a href="${url}">link</a>:</p>
  <p>Email: ${newStaff.email}<br>
  Password: ${password}</p>` 
};

// Sending the email
mailTransporter.sendMail(mailOption, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent to the staff account');
  }
});

return res.status(201).json({
  success: true,
  message: 'Staff invited successfully, email has been sent to the staff email account',
  data: {
    user:req.user.username,
    id: newStaff.id,
    email: newStaff.email,
    status: newStaff.status,
    role: newStaff.role,
  },
});
} catch (err) {
console.error('Error inviting staff:', err);
return res.status(500).json({ message: 'Internal Server Error' });
}
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  //validate user login
  const { error } = userschema.validateLogin.validate(req.body);
  if (error) {
    return res.status(404).json(error.details[0].message);
  }

  //************check for user ************ */
  const staff = await userModel.Staff.findOne({ where: { email } });
  if (!staff) {
    return res.status(400).send("Email is not registered");
  }
  const account =  staff
  const isMatch = await bcrypt.compare(password, account.password);
  try {
    if (!isMatch) {
      return res.status(404).json({ msg: "Incorrect login details" });
    } else {

       // ******************Create JWT token ***********************
      let id;
      if(staff){
        id=staff.staffId
      }
      let permission
      if (staff) {
        permission=staff.permissions
      };
      console.log( "authpermission", permission);
      console.log( "email", account.email);
      const token = jwt.sign({id, username: account.username|| account.userName, email: account.email, role: account.role, permission}, process.env.SECRET_KEY, { expiresIn: '1h' })
      res.json({token, id: id, username: account.username|| account.userName, email: account.email, role:account.role });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
