const express = require('express');
const router = express.Router();
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require('../controllers/accountController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - patId
 *         - paymentMethod
 *         - paymentProvider
 *         - treatmentType
 *       properties:
 *         acctId:
 *           type: string
 *           description: UUID of the account
 *         patId:
 *           type: string
 *           description: UUID of the associated patient (foreign key)
 *         paymentMethod:
 *           type: string
 *           enum: [HMO, Insurance, NHIS, Direct]
 *           description: Payment method used by the patient
 *         paymentProvider:
 *           type: string
 *           enum: [Hires, HMO, Federal Health Care]
 *           description: Provider for the payment method
 *         outstandBal:
 *           type: number
 *           description: Outstanding balance amount
 *         amount:
 *           type: number
 *           description: Payment amount made
 *         total:
 *           type: number
 *           description: Total amount involved in the transaction
 *         treatmentType:
 *           type: string
 *           description: Type of treatment provided
 *         paymentStatus:
 *           type: string
 *           enum: [incomplete, completed]
 *           description: Status of the payment
 *         nextPayDueDate:
 *           type: string
 *           format: date
 *           description: Next payment due date
 */

/**
 * @swagger
 * /api/v1/account/create:
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
 * /api/v1/account:
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
router.get('/', getAllAccounts);

/**
 * @swagger
 * /api/v1/account/{id}:
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
router.get('/:id', getAccountById);

/**
 * @swagger
 * /api/v1/account/{id}:
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
router.put('/:id', updateAccount);

/**
 * @swagger
 * /api/v1/account/{id}:
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
router.delete('/:id', deleteAccount);

module.exports = router;
