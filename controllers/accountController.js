const { Account } = require('../models'); // Adjust the path if necessary

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

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
