const { Account, Patient } = require('../models'); // Adjust the path if necessary
const { Op } = require('sequelize');
// Create a new account
const createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an account by ID
const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an account
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Account.update(req.body, {
      where: { acctId: id },
    });

    if (updated) {
      const updatedAccount = await Account.findByPk(id);
      return res.status(200).json({ message: 'Account updated', updatedAccount });
    }
    throw new Error('Account not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an account
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Account.destroy({
      where: { acctId: id },
    });

    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Account not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const searchAccount = async (req, res) => {
  try {
    // Extract search value from query params
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: "Search value is required" });
    }

    // Define search criteria for the patient's first name, last name, or phone number
    const searchCriteria = {
      [Op.or]: [
        { '$patient.firstName$': { [Op.iLike]: `%${searchValue}%` } },
        { '$patient.lastName$': { [Op.iLike]: `%${searchValue}%` } },
        { '$patient.phone$': { [Op.iLike]: `%${searchValue}%` } }
      ]
    };

    // Perform the query, including patient details in the response
    const accounts = await Account.findAll({
      where: searchCriteria,
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: ['firstName', 'lastName', 'phone']
        }
      ]
    });

    // If no accounts are found
    if (accounts.length === 0) {
      return res.status(404).json({ message: "No accounts found matching the search criteria" });
    }

    // Format the response to include patient information
    const formattedAccounts = accounts.map(account => ({
      acctId: account.acctId,
      paymentMethod: account.paymentMethod,
      paymentProvider: account.paymentProvider,
      outstandBal: account.outstandBal,
      amount: account.amount,
      paymentStatus: account.paymentStatus,
      patient: account.patient ? {
        firstName: account.patient.firstName,
        lastName: account.patient.lastName,
        phone: account.patient.phone
      } : null
    }));

    // Return the search results
    res.status(200).json(formattedAccounts);

  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  searchAccount
};
