const express = require('express');
const router = express.Router();
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require('../controllers/accountontroller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - patName
 *         - paymentMethod
 *         - paymentProvider
 *         - treatmentType
 *       properties:
 *         acctId:
 *           type: string
 *           description: UUID of the account
 *         patName:
 *           type: string
 *           description: Name of the patient
 *         paymentMethod:
 *           type: string
 *           enum: [HMO, Insurance, NHIS, Direct]
 *         paymentProvider:
 *           type: string
 *           enum: [Hires, HMO, Federal Health Care]
 *         outstandBal:
 *           type: number
 *           description: Outstanding balance
 *         amount:
 *           type: number
 *           description: Payment amount
 *         total:
 *           type: number
 *           description: Total amount
 *         treatmentType:
 *           type: string
 *           description: Type of treatment
 *         paymentStatus:
 *           type: string
 *           enum: [incomplete, completed]
 *         nextPayDueDate:
 *           type: string
 *           format: date
 *           description: Next payment due date
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Account created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', createAccount);

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: List of all accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       500:
 *         description: Internal Server Error
 */
router.get('/get', getAllAccounts);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID
 *     responses:
 *       200:
 *         description: Account found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/get/:id', getAccountById);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/update/:id', updateAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID
 *     responses:
 *       204:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/delete/:id', deleteAccount);

module.exports = router;
