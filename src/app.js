const express =  require('express')
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const accountRouter = require('./routes/accountRoutes')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/accounts',accountRouter)

module.exports = app