const express =  require('express')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const path = require("path");
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const accountRouter = require('./routes/accountRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const app = express()
app.use(express.json())
app.use(cookieParser())
// Serve public folder
app.use(express.static(path.join(__dirname, "../public")));
// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRouter)
app.use('/api/accounts',accountRouter)
app.use('/api/transactions', transactionRoutes)

module.exports = app