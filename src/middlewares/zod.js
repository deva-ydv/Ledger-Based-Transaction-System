const {z} = require('zod')


const registerSchema = z.object({
    name: z.string().min(3,"Name is required").trim(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, 'Password must be aleast 4 characters')
})

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, 'Password must be aleast 4 characters')
})

module.exports = {
    registerSchema,
    loginSchema
}