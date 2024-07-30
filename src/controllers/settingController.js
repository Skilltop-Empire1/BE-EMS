const Settings = require('../models/settingModel');
const User = require('../models/patientModel');

const getSettings = async (req, res) => {
    const userId = req.user.id; 
    try {
        const settings = await Settings.findOne({ where: { user_id: userId } });
        res.status(200).json({ settings });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSettings = async (req, res) => {
    const userId = req.user.id;
    const { theme, notifications } = req.body;

    try {
        const settings = await Settings.findOne({ where: { user_id: userId } });

        if (settings) {
            settings.theme = theme;
            settings.notifications = notifications;
            await settings.save();
        } else {
            await Settings.create({ user_id: userId, theme, notifications });
        }

        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateAdminSettings = async (req, res) => {
    const userId = req.user.id;
    const { roles, permissions } = req.body;

    try {
        const settings = await Settings.findOne({ where: { user_id: userId } });

        if (settings) {
            settings.roles = roles;
            settings.permissions = permissions;
            await settings.save();
        } else {
            await Settings.create({ user_id: userId, roles, permissions });
        }

        res.status(200).json({ message: 'Admin settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getSettings, updateSettings, updateAdminSettings };
