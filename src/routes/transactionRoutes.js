const {Router} = require('express')
const {authMiddleware,authSystemUserMiddleware} = require('../middlewares/authMiddleware')
const { createTransaction, createInitialFundsTransaction } = require('../controllers/transactionController')

const transactionRoutes = Router()

transactionRoutes.post('/',authMiddleware, createTransaction)

transactionRoutes.post('/system/initial-funds',authSystemUserMiddleware, createInitialFundsTransaction)
module.exports = transactionRoutes
