const express = require('express');
const router = express.Router();
const loginJWTAthentication = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const chekPerm = require('../middlewares/permissionMiddleware');
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  searchAccount
} = require('../controllers/accountController');

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
 *           description: Name of the associated patient
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
 *         paymentRefNo:
 *           type: string
 *           description: Reference number for the payment
 *         address:
 *           type: string
 *           description: Address of the patient
 *         desc:
 *           type: string
 *           description: Additional description or remarks
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
router.post('/create', loginJWTAthentication, 
  checkRole(['Admin', 'Super Admin', 'Account']), createAccount);

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
router.get('/', loginJWTAthentication, 
  checkRole(['Admin', 'Super Admin', 'Account']), getAllAccounts);

/**
 * @swagger
 * /api/v1/account/search:
 *   get:
 *     summary: Search for accounts by patient name or phone number
 *     tags: [Accounts]
 *     parameters:
 *       - in: query
 *         name: searchValue
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term for patient's first name, last name, or phone
 *     responses:
 *       200:
 *         description: List of matching accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       400:
 *         description: Bad request, search value is required
 *       404:
 *         description: No accounts found
 *       500:
 *         description: Internal Server Error
 */
router.get('/search', loginJWTAthentication, 
  checkRole(['Admin', 'Super Admin', 'Account']), searchAccount);

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
router.get('/:id', loginJWTAthentication, 
  checkRole(['Admin', 'Super Admin', 'Account']), getAccountById);

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
router.put('/:id', loginJWTAthentication, 
  checkRole(['Admin', 'Super Admin', 'Account']), updateAccount);

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
router.delete('/:id', loginJWTAthentication, 
  checkRole(['Admin', 'Super Admin', 'Account']), deleteAccount);

module.exports = router;
