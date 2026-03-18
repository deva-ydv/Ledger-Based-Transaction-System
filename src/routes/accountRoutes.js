const express = require('express')
const {authMiddleware} = require('../middlewares/authMiddleware')
const { createAccount, getUserAccounts, getAccountBalance } = require('../controllers/accountController')

const router = express.Router()



// POST api/accounts
// Create a new account 
// protected route

router.post('/', authMiddleware, createAccount)

// GET api/accounts
// get all the accounts logged in users
// protected route


router.get('/', authMiddleware, getUserAccounts)

// GET api/accounts
// get all the accounts logged in users
// protected route


router.get('/balance/:accountId', authMiddleware, getAccountBalance)



module.exports = router