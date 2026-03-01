

import express from "express" 
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

dotenv.config()
let PORT = process.env.PORT || 6000 
const app = express() 

app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
}))


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/user" , userRoutes) 



app.get("/" , (req,res) => {
     res.send("Backend Working")
})


app.listen(PORT , () => {
     console.log(`Server is Runing at ${PORT}`)
     connectDB()
})

