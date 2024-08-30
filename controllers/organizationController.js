const Organization = require("../models/organizationModel")

const create = async (req,res) => {
    const {name,username,phoneNo,address,city,state,zipCode} = req.body
    try{
        const createOrg = await Organization.create({
            org_name:name,
            org_username:username,
            org_mobile:phoneNo,
            org_address:address,             
            org_city: city, 
            org_state:state,
            org_zip_code:zipCode
        })
        res.status(201).json({createOrg})
    }catch(error){
        console.log(error)
    }
}

module.exports = {create}