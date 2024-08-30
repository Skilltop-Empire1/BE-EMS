const StaffRepository = require('./StaffRepository.js');

class AdminService {
    async createStaff(staffData) {
        const existingStaff = await StaffRepository.findByEmailOrMobile(
            staffData.email,
            staffData.mobileNumber
        );

        if (existingStaff) {
            throw new Error('Staff with this email or mobile number already exists');
        }

        await StaffRepository.createStaff(staffData);
    }

    async updateStaff(id, staffData) {
        const staff = await StaffRepository.findById(id);
        if (staff) {
            await StaffRepository.updateStaff(id, staffData);
        } else {
            throw new Error('Invalid Staff ID');
        }
    }

    async deleteStaff(id) {
        const staff = await StaffRepository.findById(id);
        if (staff) {
            await StaffRepository.deleteStaff(id);
        } else {
            throw new Error('Invalid Staff ID');
        }
    }

    // async searchStaff(name, specialization, practice) {
    //     if (name || specialization || practice) {
    //         return await StaffRepository.searchStaff(name, specialization, practice);
    //     } else {
    //         return await StaffRepository.findAll();
    //     }
    // }
    async searchStaff(name, specialization, practice) {
        let results = [];
    
        // Search by name, specialization, or practice
        if (name || specialization || practice) {
            results = await StaffRepository.searchStaff(name, specialization, practice);
        } else {
            results = await StaffRepository.findAll();
        }
    
        // Check if results are found
        if (results.length === 0) {
            throw new Error("CREDENTIALS COULD NOT BE FOUND");
        }
    
        return results;
    }
}

module.exports = new AdminService();
