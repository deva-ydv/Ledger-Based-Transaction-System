const express = require('express')
const { userRegister, userLogin, userLogout } = require('../controllers/authController.js')

const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Deva
 *               email:
 *                 type: string
 *                 example: deva@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 */

router.post('/register',userRegister)
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: deva@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login',userLogin)
router.post('/logout',userLogout)


module.exports = router