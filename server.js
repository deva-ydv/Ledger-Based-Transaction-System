require("dotenv").config()
const app = require("./src/app");
const connectDB = require('./src/config/db')

const PORT = process.env.PORT
connectDB()

app.get('/',(req,res)=>{
    res.send("live")
})

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))