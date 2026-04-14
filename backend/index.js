

import express from "express" 
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

let PORT = process.env.PORT || 6000 
const app = express() 

app.use(cors({
     origin:["https://quickkart-frontend-cdi7.onrender.com" , "https://quickkart-admin-qe91.onrender.com"],
     credentials:true
}))


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/user" , userRoutes) 
app.use("/api/product" , productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)


app.get("/" , (req,res) => {
     res.send("Backend Working")
})


app.listen(PORT , () => {
     console.log(`Server is Runing at ${PORT}`)
     connectDB()
})

