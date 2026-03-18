const {Router} = require('express')
const {authMiddleware,authSystemUserMiddleware} = require('../middlewares/authMiddleware')
const { createTransaction, createInitialFundsTransaction } = require('../controllers/transactionController')

const transactionRoutes = Router()


/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toAccount:
 *                 type: string
 *                 example: 9876543210
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Transaction successful
 */

transactionRoutes.post('/',authMiddleware, createTransaction)

transactionRoutes.post('/system/initial-funds',authSystemUserMiddleware, createInitialFundsTransaction)
module.exports = transactionRoutes
