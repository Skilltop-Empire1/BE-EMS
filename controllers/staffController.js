const Staff = require("../models/staffModel")
const Organization = require("../models/organizationModel")

const createStaff = async (req,res) => {
    const {surname,name,email,gender,phoneNo,speciaty,orgName} = req.body
    try {
        const org = await Organization.findOne({where:{org_name:orgName}})
        if(!org) return res.status(404).json("org name not found")

        const staff = await Staff.create({
            staff_surname:surname,
            staff_name:name,
            staff_email:email,
            staff_gender:gender,
            staff_mobile:phoneNo,
            specialization:speciaty,
            org_id:org.org_id
        })
        res.status(201).json({staff})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createStaff}