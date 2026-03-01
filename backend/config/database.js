import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("DB connection succesfull")

    } catch(error) {

        console.log("DB connection error")

    }
}

export default connectDB ;