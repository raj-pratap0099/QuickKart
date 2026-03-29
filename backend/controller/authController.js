import User from "../model/userModel.js";
import validator from 'validator' 
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";

export const registration = async (req ,res) => {
    try{
        const {name , email , password} = req.body ;

        const existUser = await User.findOne({email})

        if(existUser) {
            return res.status(400).json({
                message:"User already exist"
            })
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                message:"Enter Valid Email"
            })
        }

        if(password.length < 8)
        {
            return res.status(400).json({
                message:"Enter strong password"
            })
        }

        let hashedPassword = await bcrypt.hash(password , 10) 

        const user = await User.create({
            name , email ,
            password:hashedPassword
        })

        let token = await genToken(user._id)

        res.cookie("token",token , {
              httpOnly:true ,
              secure:true,
              sameSite:"none",
              maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            user,
            message:"user created ",
        })

    } catch(error) {

        console.log("signUp error")
        return res.status(500).json({
            message:`signUp error ${error}`,
        })

    }
}


export const login = async (req,res) =>{
    try {
        let {email , password} = req.body ;
        
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({
                message:"User is not found"
            })
        } 
        let isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch) {
            return res.status(400).json({
                message:"Incorrect Password" 
            })
        }

        let token = await genToken(user._id)

        res.cookie("token", token , {
              httpOnly:true ,
              secure:true,
              sameSite:"none",
              maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            user
        })

    } catch(error) {
         console.log("login error")
        return res.status(500).json({
            message:`login error ${error}`,
        })
    }
}


export const logOut = async (req,res) => {
    try{
        res.clearCookie("token") 

        return res.status(200).json({
            message:"LogOut successfull"
        })

    } catch(error) {
        console.log("logOut error")
        return res.status(500).json({
            message:`logOut error ${error}`,
        })
    }
}


export const googleLogin = async (req , res) => {
    try {
        let {name , email} = req.body ;
        
        let user = await User.findOne({email}) 

        if(!user) {
            user = await User.create({
                name , email 
            })
        }

        let token = await genToken(user._id) 
        res.cookie("token",token , {
              httpOnly:true ,
              secure:true,
              sameSite:"none",
              maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            user
        })

    } catch(error) {
        console.log("googleLogin error" , error)
        return res.status(500).json({
            message:`googleLogin error ${error}`,
        })
    }
}


export const adminLogin = async (req,res) => {
  try {
     const {email , password} = req.body ;

     if(email === process.env.ADMIN_EMAIL 
     && password === process.env.ADMIN_PASSWORD)
     {
        let token = await genToken1(email) 
        res.cookie("token",token , {
              httpOnly:true ,
              secure:true,
              sameSite:"none",
              maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            token
        })
    }
    return res.status(400).json({
            messge:`googleLogin error ${error}`
    })

  } catch(error) {
        console.log("AdminLogin error" , error)
        return res.status(500).json({
            message:`AdminLogin error ${error}`,
        })
  }
}
